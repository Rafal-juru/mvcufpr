import nodemailer from 'nodemailer';

// Returns null when SMTP is not configured — newsletter still saves to DB.
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

// Confirmation e-mail sent to the new subscriber.
export async function sendNewsletterConfirmation(toEmail) {
  const transport = createTransport();
  if (!transport) return; // SMTP not configured — skip silently

  await transport.sendMail({
    from: FROM(),
    to: toEmail,
    subject: 'Inscrição confirmada — CESMVC UFPR',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
        <div style="background:#2B4C7E;padding:28px 32px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;font-size:20px;margin:0">CESMVC · UFPR</h1>
          <p style="color:rgba(255,255,255,.7);margin:4px 0 0;font-size:14px">
            Ciência e Informação
          </p>
        </div>
        <div style="background:#f9f9f9;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e5e5;border-top:none">
          <p style="font-size:16px;margin-top:0">Olá!</p>
          <p>
            Sua inscrição na newsletter do
            <strong>Centro de Especialização em Medicina Veterinária Coletiva — UFPR</strong>
            foi confirmada.
          </p>
          <p>
            Você receberá artigos, pesquisas e atualizações sobre
            <strong>saúde única, epidemiologia, manejo populacional</strong> e
            políticas públicas veterinárias.
          </p>
          <p style="color:#666;font-size:13px;margin-top:24px;border-top:1px solid #e5e5e5;padding-top:16px">
            Se você não solicitou esta inscrição, ignore este e-mail.
          </p>
        </div>
      </div>
    `,
  });
}

// Notification e-mail sent to the admin when a new subscriber joins.
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
