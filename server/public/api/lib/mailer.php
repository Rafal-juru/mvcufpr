<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;

function mailer_transport(): ?PHPMailer {
    $cfg = load_config()['smtp'];
    if (empty($cfg['host']) || empty($cfg['user']) || empty($cfg['pass'])) {
        return null;
    }

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $cfg['host'];
    $mail->SMTPAuth = true;
    $mail->Username = $cfg['user'];
    $mail->Password = $cfg['pass'];
    $mail->Port = (int)($cfg['port'] ?? 587);
    $mail->SMTPSecure = !empty($cfg['secure']) ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->CharSet = 'UTF-8';

    $from = $cfg['from'] ?: "CESMVC UFPR <{$cfg['user']}>";
    if (preg_match('/^(.*)<(.+)>$/', $from, $m)) {
        $mail->setFrom(trim($m[2]), trim($m[1]));
    } else {
        $mail->setFrom($from);
    }

    return $mail;
}

function hmac_secret(): string {
    $cfg = load_config();
    return $cfg['jwt_secret'] ?: 'changeme';
}

function generate_unsubscribe_url(string $email, string $baseUrl): string {
    $sig = hash_hmac('sha256', strtolower($email), hmac_secret());
    return "{$baseUrl}/newsletter/cancelar?email=" . urlencode($email) . "&sig={$sig}";
}

function verify_unsubscribe_sig(string $email, string $sig): bool {
    $expected = hash_hmac('sha256', strtolower($email), hmac_secret());
    return hash_equals($expected, $sig);
}

function mail_header(): string {
    return '
      <div style="background:#2B4C7E;padding:24px 32px;border-radius:12px 12px 0 0">
        <p style="color:#fff;font-size:18px;font-weight:700;margin:0">CESMVC · UFPR</p>
        <p style="color:rgba(255,255,255,.65);font-size:13px;margin:4px 0 0">Ciência e Informação</p>
      </div>';
}

function mail_footer(?string $adminEmail, ?string $unsubscribeUrl): string {
    $body = $unsubscribeUrl
        ? '<a href="' . $unsubscribeUrl . '" style="color:#2B4C7E;font-size:12px;font-weight:600;text-decoration:underline">Cancelar inscrição</a>'
        : '<p style="color:#bbb;font-size:11px;margin:0">Para cancelar, responda com o assunto CANCELAR'
            . ($adminEmail ? " ou escreva para {$adminEmail}" : '') . '.</p>';

    return '
      <div style="padding:20px 32px;background:#f0f0f0;border-radius:0 0 12px 12px;border:1px solid #ddd;border-top:none;text-align:center">
        <p style="color:#999;font-size:12px;margin:0 0 8px;line-height:1.6">
          Você está recebendo este e-mail porque se inscreveu na newsletter do CESMVC–UFPR.
        </p>
        ' . $body . '
      </div>';
}

function send_newsletter_confirmation(string $toEmail, ?string $baseUrl): void {
    $mail = mailer_transport();
    if (!$mail) return;

    $unsubUrl = $baseUrl ? generate_unsubscribe_url($toEmail, $baseUrl) : null;
    $adminEmail = load_config()['admin']['email'] ?? null;

    $mail->addAddress($toEmail);
    $mail->isHTML(true);
    $mail->Subject = 'Inscrição confirmada — CESMVC UFPR';
    $mail->Body = '
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
        ' . mail_header() . '
        <div style="background:#f9f9f9;padding:28px 32px;border:1px solid #e5e5e5;border-top:none">
          <p style="font-size:16px;margin-top:0">Olá!</p>
          <p>Sua inscrição na newsletter do <strong>Centro de Especialização em Medicina Veterinária Coletiva — UFPR</strong> foi confirmada.</p>
          <p>Você receberá artigos, pesquisas e atualizações sobre <strong>saúde única, epidemiologia, manejo populacional</strong> e políticas públicas veterinárias.</p>
          <p style="color:#888;font-size:13px;margin-top:20px;border-top:1px solid #e5e5e5;padding-top:16px">
            Se você não solicitou esta inscrição, ignore este e-mail.
          </p>
        </div>
        ' . mail_footer($adminEmail, $unsubUrl) . '
      </div>';

    try {
        $mail->send();
    } catch (Throwable $e) {
        error_log('[newsletter] erro ao enviar confirmação: ' . $e->getMessage());
    }
}

function send_admin_notification(string $subscriberEmail): void {
    $adminEmail = load_config()['admin']['email'] ?? null;
    $mail = mailer_transport();
    if (!$mail || !$adminEmail) return;

    $mail->addAddress($adminEmail);
    $mail->Subject = "Nova inscrição na newsletter: {$subscriberEmail}";
    $mail->Body = "Um novo e-mail foi cadastrado na newsletter:\n\n{$subscriberEmail}";

    try {
        $mail->send();
    } catch (Throwable $e) {
        error_log('[newsletter] erro ao notificar admin: ' . $e->getMessage());
    }
}

function send_post_broadcast(array $post, array $subscriberEmails, string $baseUrl): array {
    $mail = mailer_transport();
    if (!$mail || count($subscriberEmails) === 0) {
        return ['sent' => 0, 'failed' => 0, 'skipped' => count($subscriberEmails)];
    }

    $adminEmail = load_config()['admin']['email'] ?? null;
    $postUrl = "{$baseUrl}/blog/{$post['slug']}";
    $coverImageUrl = $post['coverImage']
        ? (str_starts_with($post['coverImage'], 'http') ? $post['coverImage'] : $baseUrl . $post['coverImage'])
        : '';
    $coverBlock = $coverImageUrl
        ? '<img src="' . $coverImageUrl . '" alt="' . htmlspecialchars($post['title']) . '" style="width:100%;border-radius:8px;margin-bottom:20px;display:block">'
        : '';

    $metaParts = [];
    if ($post['author']) $metaParts[] = '<strong style="color:#555">' . htmlspecialchars($post['author']) . '</strong>';
    if ($post['publishedAt']) {
        $metaParts[] = date_pt_br($post['publishedAt']);
    }
    if ($post['readingMinutes']) $metaParts[] = "{$post['readingMinutes']} min de leitura";
    $metaLine = $metaParts ? '<p style="font-size:12px;color:#888;margin:0 0 20px">' . implode(' &nbsp;·&nbsp; ', $metaParts) . '</p>' : '';

    $categoryLine = $post['category']
        ? '<p style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#2B4C7E;margin:0 0 12px">' . htmlspecialchars($post['category']) . '</p>'
        : '';
    $excerptLine = $post['excerpt']
        ? '<p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 24px">' . htmlspecialchars($post['excerpt']) . '</p>'
        : '';

    $sent = 0;
    $failed = 0;

    foreach ($subscriberEmails as $email) {
        $unsubUrl = generate_unsubscribe_url($email, $baseUrl);
        $mail->clearAddresses();
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->Subject = "Novo artigo: {$post['title']} — CESMVC UFPR";
        $mail->Body = '
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
            ' . mail_header() . '
            <div style="background:#fff;padding:28px 32px;border:1px solid #e5e5e5;border-top:none">
              ' . $categoryLine . '
              <h1 style="font-size:22px;font-weight:700;margin:0 0 10px;line-height:1.3;color:#111">' . htmlspecialchars($post['title']) . '</h1>
              ' . $metaLine . '
              ' . $coverBlock . '
              ' . $excerptLine . '
              <a href="' . $postUrl . '" style="display:inline-block;background:#D96C2B;color:#fff;font-weight:700;font-size:14px;padding:12px 28px;border-radius:999px;text-decoration:none">Ler artigo completo →</a>
              <p style="font-size:13px;color:#888;margin-top:24px">Ou acesse: <a href="' . $postUrl . '" style="color:#2B4C7E">' . $postUrl . '</a></p>
            </div>
            ' . mail_footer($adminEmail, $unsubUrl) . '
          </div>';

        try {
            $mail->send();
            $sent++;
        } catch (Throwable $e) {
            error_log("[newsletter] falha ao enviar para {$email}: " . $e->getMessage());
            $failed++;
        }
    }

    error_log("[newsletter] broadcast concluído — enviados: {$sent}, falhas: {$failed}");
    return ['sent' => $sent, 'failed' => $failed];
}

function date_pt_br(string $ymd): string {
    $months = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
    $ts = strtotime($ymd . ' 12:00:00');
    if (!$ts) return $ymd;
    return (int)date('j', $ts) . ' de ' . $months[(int)date('n', $ts) - 1] . ' de ' . date('Y', $ts);
}
