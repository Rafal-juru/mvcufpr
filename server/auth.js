import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'seu_secret_jwt_muito_seguro_aqui_12345';

// Credenciais do admin configuráveis por variável de ambiente (Plesk).
// Em produção, defina ADMIN_EMAIL e ADMIN_PASSWORD fortes; os valores abaixo
// são apenas fallback para desenvolvimento.
const ADMIN_USERS = [
  {
    id: 1,
    email: process.env.ADMIN_EMAIL || 'admin@cesmvc.ufpr.br',
    password: process.env.ADMIN_PASSWORD || 'cesmvc2025',
    name: process.env.ADMIN_NAME || 'Administrador',
  },
];

export function login(email, password) {
  const normalized = String(email || '').trim().toLowerCase();
  const user = ADMIN_USERS.find(u => u.email.toLowerCase() === normalized && u.password === password);

  if (!user) {
    throw new Error('Email ou senha incorretos');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
}

export function extractTokenFromHeader(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.slice(7);
}
