import express from 'express';
import pool from '../db.js';
import { sendNewsletterConfirmation, sendAdminNotification } from '../mailer.js';

const router = express.Router();

const CREATE_SUBSCRIBERS_TABLE = `
  CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    email      VARCHAR(254) NOT NULL UNIQUE,
    created_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`;

// Ensure the table exists on every request (no-op if already created).
async function ensureTable() {
  await pool.query(CREATE_SUBSCRIBERS_TABLE);
}

// POST /api/newsletter  — registra um e-mail na lista de inscritos.
router.post('/', async (req, res) => {
  const { email } = req.body ?? {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'E-mail inválido.' });
  }

  const normalized = email.toLowerCase().trim();

  try {
    await ensureTable();

    await pool.query(
      'INSERT INTO newsletter_subscribers (email) VALUES (?)',
      [normalized]
    );

    sendNewsletterConfirmation(normalized).catch((err) =>
      console.error('Erro ao enviar e-mail de confirmação:', err.message)
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
    // Expõe o erro real temporariamente para diagnóstico.
    return res.status(500).json({ message: error.message });
  }
});

export default router;
