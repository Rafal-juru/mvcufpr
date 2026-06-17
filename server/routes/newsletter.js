import express from 'express';
import pool from '../db.js';

const router = express.Router();

// POST /api/newsletter  — registra um e-mail na lista de inscritos.
router.post('/', async (req, res) => {
  const { email } = req.body ?? {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'E-mail inválido.' });
  }

  try {
    await pool.query(
      'INSERT INTO newsletter_subscribers (email) VALUES (?)',
      [email.toLowerCase().trim()]
    );
    return res.status(201).json({ message: 'Inscrição realizada com sucesso!' });
  } catch (error) {
    // ER_DUP_ENTRY → e-mail já cadastrado, retorna 200 sem vazar informação.
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(200).json({ message: 'E-mail já cadastrado.' });
    }
    console.error('Erro ao salvar inscrito:', error);
    return res.status(500).json({ message: 'Erro interno. Tente novamente.' });
  }
});

export default router;
