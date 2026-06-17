import nodemailer from 'nodemailer';

function createTransport() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const FROM = () =>
  (process.env.SMTP_FROM || `CESMVC UFPR <${process.env.SMTP_USER}>`).trim();

const HEADER = `
  <div style="background:#2B4C7E;padding:24px 32px;border-radius:12px 12px 0 0">
    <p style="color:#fff;font-size:18px;font-weight:700;margin:0">CESMVC · UFPR</p>
    <p style="color:rgba(255,255,255,.65);font-size:13px;margin:4px 0 0">Ciência e Informação</p>
  </div>`;

const FOOTER = (adminEmail) => `
  <div style="padding:20px 32px;background:#f0f0f0;border-radius:0 0 12px 12px;border:1px solid #ddd;border-top:none">
    <p style="color:#999;font-size:12px;margin:0;line-height:1.6">
      Você está recebendo este e-mail porque se inscreveu na newsletter do CESMVC–UFPR.<br>
      Para cancelar a inscrição, responda este e-mail com o assunto <strong>CANCELAR</strong>
      ${adminEmail ? `ou escreva para <a href="mailto:${adminEmail}" style="color:#2B4C7E">${adminEmail}</a>` : ''}.
    </p>
  </div>`;

// ── Confirmação de inscrição ──────────────────────────────────────────────────
export async function sendNewsletterConfirmation(toEmail) {
  const transport = createTransport();
  if (!transport) return;

  await transport.sendMail({
    from: FROM(),
    to: toEmail,
    subject: 'Inscrição confirmada — CESMVC UFPR',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
        ${HEADER}
        <div style="background:#f9f9f9;padding:28px 32px;border:1px solid #e5e5e5;border-top:none">
          <p style="font-size:16px;margin-top:0">Olá!</p>
          <p>Sua inscrição na newsletter do <strong>Centro de Especialização em Medicina Veterinária Coletiva — UFPR</strong> foi confirmada.</p>
          <p>Você receberá artigos, pesquisas e atualizações sobre <strong>saúde única, epidemiologia, manejo populacional</strong> e políticas públicas veterinárias.</p>
          <p style="color:#888;font-size:13px;margin-top:20px;border-top:1px solid #e5e5e5;padding-top:16px">
            Se você não solicitou esta inscrição, ignore este e-mail.
          </p>
        </div>
        ${FOOTER(process.env.ADMIN_EMAIL)}
      </div>`,
  });
}

// ── Notificação interna: novo inscrito ───────────────────────────────────────
export async function sendAdminNotification(subscriberEmail) {
  const transport = createTransport();
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!transport || !adminEmail) return;

  await transport.sendMail({
    from: FROM(),
    to: adminEmail,
    subject: `Nova inscrição na newsletter: ${subscriberEmail}`,
    text: `Um novo e-mail foi cadastrado na newsletter:\n\n${subscriberEmail}`,
  });
}

// ── Broadcast: novo post publicado → todos os inscritos ──────────────────────
export async function sendPostBroadcast(post, subscriberEmails, baseUrl) {
  const transport = createTransport();
  if (!transport || subscriberEmails.length === 0) {
    return { sent: 0, failed: 0, skipped: subscriberEmails.length };
  }

  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const coverBlock = post.coverImage
    ? `<img src="${post.coverImage}" alt="${post.title}"
           style="width:100%;border-radius:8px;margin-bottom:20px;display:block">`
    : '';

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
      ${HEADER}
      <div style="background:#fff;padding:28px 32px;border:1px solid #e5e5e5;border-top:none">
        ${post.category
          ? `<p style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#2B4C7E;margin:0 0 12px">${post.category}</p>`
          : ''}
        <h1 style="font-size:22px;font-weight:700;margin:0 0 16px;line-height:1.3;color:#111">
          ${post.title}
        </h1>
        ${coverBlock}
        ${post.excerpt
          ? `<p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 24px">${post.excerpt}</p>`
          : ''}
        <a href="${postUrl}"
           style="display:inline-block;background:#D96C2B;color:#fff;font-weight:700;
                  font-size:14px;padding:12px 28px;border-radius:999px;text-decoration:none">
          Ler artigo completo →
        </a>
        <p style="font-size:13px;color:#888;margin-top:24px">
          Ou acesse: <a href="${postUrl}" style="color:#2B4C7E">${postUrl}</a>
        </p>
      </div>
      ${FOOTER(process.env.ADMIN_EMAIL)}
    </div>`;

  let sent = 0;
  let failed = 0;

  for (const email of subscriberEmails) {
    try {
      await transport.sendMail({
        from: FROM(),
        to: email,
        subject: `Novo artigo: ${post.title} — CESMVC UFPR`,
        html,
      });
      sent++;
    } catch (err) {
      console.error(`[newsletter] falha ao enviar para ${email}:`, err.message);
      failed++;
    }
  }

  console.log(`[newsletter] broadcast concluído — enviados: ${sent}, falhas: ${failed}`);
  return { sent, failed };
}
