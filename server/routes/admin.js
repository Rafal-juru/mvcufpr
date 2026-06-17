import express from 'express';
import pool from '../db.js';
import { authMiddleware } from './auth.js';
import { rowToPost, estimateReadingMinutes } from '../mapPost.js';
import { sendPostBroadcast } from '../mailer.js';

const router = express.Router();

router.use(authMiddleware);

// Fetch all newsletter subscriber emails.
async function getSubscriberEmails() {
  const [rows] = await pool.query(
    'SELECT email FROM newsletter_subscribers'
  );
  return rows.map((r) => r.email);
}

// Derive base URL from the request (falls back to SITE_URL env var).
function baseUrl(req) {
  return (process.env.SITE_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
}

// GET /api/admin/posts
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

// GET /api/admin/posts/:id
router.get('/posts/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Artigo não encontrado' });
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

  const finalStatus = status === 'published' ? 'published' : 'draft';

  try {
    const readingMinutes = estimateReadingMinutes(content);
    const [result] = await pool.query(
      `INSERT INTO posts
         (slug, title, excerpt, content, category, cover_image, author, status, published_at, reading_minutes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, title, excerpt ?? null, content, category ?? null,
       coverImage ?? null, author ?? null, finalStatus, publishedAt || null, readingMinutes]
    );

    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [result.insertId]);
    const post = rowToPost(rows[0]);
    res.status(201).json(post);

    // Broadcast ao criar já publicado (fire-and-forget).
    if (finalStatus === 'published') {
      getSubscriberEmails()
        .then((emails) => sendPostBroadcast(post, emails, baseUrl(req)))
        .catch((err) => console.error('[newsletter] erro no broadcast (POST):', err.message));
    }
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

  const finalStatus = status === 'published' ? 'published' : 'draft';

  try {
    // Lê status anterior para detectar draft → published.
    const [prev] = await pool.query('SELECT status FROM posts WHERE id = ?', [req.params.id]);
    const wasPublished = prev[0]?.status === 'published';

    const readingMinutes = estimateReadingMinutes(content);
    const [result] = await pool.query(
      `UPDATE posts SET
         slug = ?, title = ?, excerpt = ?, content = ?, category = ?,
         cover_image = ?, author = ?, status = ?, published_at = ?, reading_minutes = ?
       WHERE id = ?`,
      [slug, title, excerpt ?? null, content, category ?? null,
       coverImage ?? null, author ?? null, finalStatus,
       publishedAt || null, readingMinutes, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Artigo não encontrado' });
    }

    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    const post = rowToPost(rows[0]);
    res.json(post);

    // Broadcast apenas quando muda de rascunho para publicado (fire-and-forget).
    if (!wasPublished && finalStatus === 'published') {
      getSubscriberEmails()
        .then((emails) => sendPostBroadcast(post, emails, baseUrl(req)))
        .catch((err) => console.error('[newsletter] erro no broadcast (PUT):', err.message));
    }
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Já existe um artigo com esse slug' });
    }
    console.error('Erro ao atualizar post:', error);
    res.status(500).json({ message: 'Erro ao atualizar post' });
  }
});

// DELETE /api/admin/posts/:id
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
