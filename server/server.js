import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import postsRoutes from './routes/posts.js';
import adminRoutes from './routes/admin.js';
import uploadRoutes from './routes/upload.js';
import authRoutes from './routes/auth.js';
import newsletterRoutes from './routes/newsletter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Imagens enviadas pelo painel (caminho absoluto p/ funcionar sob Passenger).
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── API ──
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api', uploadRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ── Frontend (SPA) em produção ──
// Quando existir a pasta `public` (build do Vite copiado para cá), o mesmo
// processo Node serve o site e a API no mesmo domínio — sem CORS.
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  // Fallback de SPA: qualquer GET que não seja /api ou /uploads volta ao index.html,
  // para que rotas de cliente (/blog/:slug, /admin) funcionem ao recarregar a página.
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(publicDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
