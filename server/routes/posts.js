import express from 'express';
import pool from '../db.js';
import { rowToPost } from '../mapPost.js';

const router = express.Router();

// GET /api/posts — apenas artigos publicados, mais recentes primeiro.
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC, id DESC"
    );
    res.json(rows.map(rowToPost));
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    res.status(500).json({ message: 'Erro ao buscar posts' });
  }
});

// GET /api/posts/:slug — um artigo publicado, buscado pelo slug.
router.get('/:slug', async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM posts WHERE slug = ? AND status = 'published'",
      [req.params.slug]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }
    res.json(rowToPost(rows[0]));
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    res.status(500).json({ message: 'Erro ao buscar post' });
  }
});

export default router;
