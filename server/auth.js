import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'seu_secret_jwt_muito_seguro_aqui_12345';

// Credenciais padrão (pode expandir para banco de dados depois)
const ADMIN_USERS = [
  {
    id: 1,
    email: 'admin@cesmvc.ufpr.br',
    password: 'cesmvc2025',
    name: 'Administrador',
  },
];

export function login(email, password) {
  const user = ADMIN_USERS.find(u => u.email === email && u.password === password);

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
