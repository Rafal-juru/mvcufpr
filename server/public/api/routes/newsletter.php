<?php
// POST /api/newsletter, POST /api/newsletter/unsubscribe
require_once __DIR__ . '/../lib/mailer.php';

function newsletter_base_url(): string {
    $cfg = load_config();
    if (!empty($cfg['site_url'])) return rtrim($cfg['site_url'], '/');
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    return "{$scheme}://{$_SERVER['HTTP_HOST']}";
}

if ($method === 'POST' && ($rest[0] ?? '') === 'unsubscribe') {
    $body = json_body();
    $email = $body['email'] ?? null;
    $sig = $body['sig'] ?? null;

    if (!$email || !$sig || !verify_unsubscribe_sig($email, $sig)) {
        json_response(['message' => 'Link inválido ou expirado.'], 400);
    }

    $stmt = db()->prepare('DELETE FROM newsletter_subscribers WHERE email = ?');
    $stmt->execute([strtolower($email)]);
    json_response(['message' => 'Inscrição cancelada com sucesso.']);
}

if ($method === 'POST' && count($rest) === 0) {
    $body = json_body();
    $email = $body['email'] ?? '';

    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json_response(['message' => 'E-mail inválido.'], 400);
    }

    $normalized = strtolower(trim($email));

    try {
        $stmt = db()->prepare('INSERT INTO newsletter_subscribers (email) VALUES (?)');
        $stmt->execute([$normalized]);
    } catch (PDOException $e) {
        if ($e->getCode() === '23000') {
            json_response(['message' => 'E-mail já cadastrado.'], 200);
        }
        throw $e;
    }

    $base = newsletter_base_url();
    respond_and_continue(['message' => 'Inscrição realizada com sucesso!'], 201);

    try {
        send_newsletter_confirmation($normalized, $base);
    } catch (Throwable $e) {
        error_log('Erro ao enviar confirmação: ' . $e->getMessage());
    }
    try {
        send_admin_notification($normalized);
    } catch (Throwable $e) {
        error_log('Erro ao notificar admin: ' . $e->getMessage());
    }
    return;
}

json_response(['message' => 'Not found'], 404);
