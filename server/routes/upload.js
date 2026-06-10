import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { authMiddleware } from './auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '../uploads');

// Criar pasta se não existir
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas (JPEG, PNG, GIF)'));
    }
  },
});

const router = express.Router();

// Upload protegido — só admin autenticado envia imagens.
// O multer roda dentro do handler para devolver erros como JSON.
router.post('/upload-image', authMiddleware, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhuma imagem enviada' });
    }
    // URL servida via /api/media (sem extensão de arquivo no caminho) para que
    // o nginx do Plesk NÃO trate como estático e repasse ao Node. Imagens em
    // /uploads/*.png seriam interceptadas pelo nginx e dariam 404.
    res.json({ url: `/api/media?file=${encodeURIComponent(req.file.filename)}` });
  });
});

// GET /api/media?file=<nome> — serve a imagem da pasta uploads.
// O caminho "/api/media" não tem extensão, então o nginx repassa ao Node.
router.get('/media', (req, res) => {
  const file = String(req.query.file || '');
  // Bloqueia path traversal: nada de barras nem "..".
  if (!file || /[\\/]/.test(file) || file.includes('..')) {
    return res.status(400).json({ message: 'Arquivo inválido' });
  }
  const filePath = path.join(uploadsDir, file);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Imagem não encontrada' });
  }
  res.sendFile(filePath);
});

export default router;
