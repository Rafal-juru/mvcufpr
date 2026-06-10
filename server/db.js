import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mvcufpr',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Criar tabela de posts se não existir
async function initializeDB() {
  const connection = await pool.getConnection();

  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        excerpt VARCHAR(500),
        content LONGTEXT NOT NULL,
        category VARCHAR(100),
        image_url VARCHAR(500),
        author VARCHAR(150),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_created_at (created_at),
        INDEX idx_category (category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Tabela de posts inicializada');
  } catch (error) {
    console.error('Erro ao inicializar banco:', error);
  } finally {
    connection.release();
  }
}

// Chamar ao iniciar
initializeDB();

export default pool;
