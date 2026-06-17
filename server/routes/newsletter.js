import express from 'express';
import pool from '../db.js';
import {
  sendNewsletterConfirmation,
  sendAdminNotification,
  verifyUnsubscribeSig,
} from '../mailer.js';

const router = express.Router();

const CREATE_SUBSCRIBERS_TABLE = `
  CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    email      VARCHAR(191) NOT NULL UNIQUE,
    created_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`;

async function ensureTable() {
  await pool.query(CREATE_SUBSCRIBERS_TABLE);
}

function baseUrl(req) {
  return (process.env.SITE_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
}

// POST /api/newsletter — registra um e-mail na lista de inscritos.
router.post('/', async (req, res) => {
  const { email } = req.body ?? {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'E-mail inválido.' });
  }

  const normalized = email.toLowerCase().trim();

  try {
    await ensureTable();
    await pool.query('INSERT INTO newsletter_subscribers (email) VALUES (?)', [normalized]);

    const base = baseUrl(req);
    sendNewsletterConfirmation(normalized, base).catch((err) =>
      console.error('Erro ao enviar confirmação:', err.message)
    );
    sendAdminNotification(normalized).catch((err) =>
      console.error('Erro ao notificar admin:', err.message)
    );

    return res.status(201).json({ message: 'Inscrição realizada com sucesso!' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(200).json({ message: 'E-mail já cadastrado.' });
    }
    console.error('Erro ao salvar inscrito:', error);
    return res.status(500).json({ message: error.message });
  }
});

// GET /api/newsletter/unsubscribe?email=...&sig=... — cancela inscrição via link.
router.get('/unsubscribe', async (req, res) => {
  const { email, sig } = req.query;
  const site = baseUrl(req);
  const failUrl = `${site}/newsletter/cancelada?status=invalido`;

  if (!email || !sig || !verifyUnsubscribeSig(email, sig)) {
    return res.redirect(failUrl);
  }

  try {
    await pool.query(
      'DELETE FROM newsletter_subscribers WHERE email = ?',
      [email.toLowerCase()]
    );
    return res.redirect(`${site}/newsletter/cancelada?status=ok`);
  } catch (err) {
    console.error('Erro ao cancelar inscrição:', err.message);
    return res.redirect(`${site}/newsletter/cancelada?status=erro`);
  }
});

export default router;
