import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET todos os posts (públicos)
router.get('/', async (req, res) => {
  try {
    const [posts] = await pool.query(
      'SELECT id, title, excerpt, image_url, category, author, created_at FROM posts ORDER BY created_at DESC LIMIT 10'
    );
    res.json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    res.status(500).json({ error: 'Erro ao buscar posts' });
  }
});

// GET post por ID (público)
router.get('/:id', async (req, res) => {
  try {
    const [posts] = await pool.query(
      'SELECT * FROM posts WHERE id = ?',
      [req.params.id]
    );
    if (posts.length === 0) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }
    res.json(posts[0]);
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    res.status(500).json({ error: 'Erro ao buscar post' });
  }
});

// POST criar novo post (requer autenticação — simplificado com chave secreta)
router.post('/', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  const { title, excerpt, content, category, image_url, author } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO posts (title, excerpt, content, category, image_url, author) VALUES (?, ?, ?, ?, ?, ?)',
      [title, excerpt || null, content, category || 'Geral', image_url || null, author || 'UFPR']
    );
    res.status(201).json({ id: result.insertId, message: 'Post criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ error: 'Erro ao criar post' });
  }
});

// PUT atualizar post (requer autenticação)
router.put('/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  const { title, excerpt, content, category, image_url, author } = req.body;

  try {
    await pool.query(
      'UPDATE posts SET title = ?, excerpt = ?, content = ?, category = ?, image_url = ?, author = ? WHERE id = ?',
      [title, excerpt || null, content, category || 'Geral', image_url || null, author || 'UFPR', req.params.id]
    );
    res.json({ message: 'Post atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    res.status(500).json({ error: 'Erro ao atualizar post' });
  }
});

// DELETE post (requer autenticação)
router.delete('/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  try {
    const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }
    res.json({ message: 'Post deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    res.status(500).json({ error: 'Erro ao deletar post' });
  }
});

export default router;
