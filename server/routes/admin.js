import express from 'express';
import pool from '../db.js';
import { authMiddleware } from './auth.js';
import { rowToPost, estimateReadingMinutes } from '../mapPost.js';

const router = express.Router();

// Todas as rotas de admin exigem autenticação.
router.use(authMiddleware);

// GET /api/admin/posts — todos os artigos (inclusive rascunhos).
router.get('/posts', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM posts ORDER BY published_at DESC, id DESC'
    );
    res.json(rows.map(rowToPost));
  } catch (error) {
    console.error('Erro ao listar posts (admin):', error);
    res.status(500).json({ message: 'Erro ao listar posts' });
  }
});

// GET /api/admin/posts/:id — um artigo por id.
router.get('/posts/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }
    res.json(rowToPost(rows[0]));
  } catch (error) {
    console.error('Erro ao buscar post (admin):', error);
    res.status(500).json({ message: 'Erro ao buscar post' });
  }
});

// POST /api/admin/posts — cria um artigo.
router.post('/posts', async (req, res) => {
  const { slug, title, excerpt, content, category, coverImage, author, status, publishedAt } = req.body;

  if (!slug || !title || !content) {
    return res.status(400).json({ message: 'Slug, título e conteúdo são obrigatórios' });
  }

  try {
    const readingMinutes = estimateReadingMinutes(content);
    const [result] = await pool.query(
      `INSERT INTO posts
         (slug, title, excerpt, content, category, cover_image, author, status, published_at, reading_minutes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug,
        title,
        excerpt ?? null,
        content,
        category ?? null,
        coverImage ?? null,
        author ?? null,
        status === 'published' ? 'published' : 'draft',
        publishedAt || null,
        readingMinutes,
      ]
    );
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [result.insertId]);
    res.status(201).json(rowToPost(rows[0]));
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Já existe um artigo com esse slug' });
    }
    console.error('Erro ao criar post:', error);
    res.status(500).json({ message: 'Erro ao criar post' });
  }
});

// PUT /api/admin/posts/:id — atualiza um artigo.
router.put('/posts/:id', async (req, res) => {
  const { slug, title, excerpt, content, category, coverImage, author, status, publishedAt } = req.body;

  if (!slug || !title || !content) {
    return res.status(400).json({ message: 'Slug, título e conteúdo são obrigatórios' });
  }

  try {
    const readingMinutes = estimateReadingMinutes(content);
    const [result] = await pool.query(
      `UPDATE posts SET
         slug = ?, title = ?, excerpt = ?, content = ?, category = ?,
         cover_image = ?, author = ?, status = ?, published_at = ?, reading_minutes = ?
       WHERE id = ?`,
      [
        slug,
        title,
        excerpt ?? null,
        content,
        category ?? null,
        coverImage ?? null,
        author ?? null,
        status === 'published' ? 'published' : 'draft',
        publishedAt || null,
        readingMinutes,
        req.params.id,
      ]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    res.json(rowToPost(rows[0]));
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Já existe um artigo com esse slug' });
    }
    console.error('Erro ao atualizar post:', error);
    res.status(500).json({ message: 'Erro ao atualizar post' });
  }
});

// DELETE /api/admin/posts/:id — remove um artigo.
router.delete('/posts/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    res.status(500).json({ message: 'Erro ao deletar post' });
  }
});

export default router;
