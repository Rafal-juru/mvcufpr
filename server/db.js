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
  // Retorna DATE/DATETIME como string ('YYYY-MM-DD'), evitando objetos Date —
  // o frontend trabalha com publishedAt no formato 'YYYY-MM-DD'.
  dateStrings: true,
});

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(191) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    excerpt VARCHAR(500),
    content LONGTEXT NOT NULL,
    category VARCHAR(100),
    cover_image VARCHAR(1000),
    author VARCHAR(150),
    status ENUM('draft','published') NOT NULL DEFAULT 'draft',
    published_at DATE,
    reading_minutes INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_published_at (published_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`;

const CREATE_NEWSLETTER_TABLE = `
  CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    email      VARCHAR(254) NOT NULL UNIQUE,
    created_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`;

// Cria/migra a tabela de posts para o schema esperado pelo frontend.
async function initializeDB() {
  let connection;
  try {
    connection = await pool.getConnection();

    // Detecta um schema antigo (sem a coluna `slug`) e recria a tabela.
    const [cols] = await connection.query(
      `SELECT COLUMN_NAME FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'posts'`,
      [process.env.DB_NAME || 'mvcufpr']
    );

    const tableExists = cols.length > 0;
    const hasSlug = cols.some((c) => c.COLUMN_NAME === 'slug');

    if (tableExists && !hasSlug) {
      console.log('⚠ Schema antigo detectado — recriando tabela posts');
      await connection.query('DROP TABLE posts');
    }

    await connection.query(CREATE_TABLE);
    await connection.query(CREATE_NEWSLETTER_TABLE);
    console.log('✓ Tabelas de posts e newsletter prontas');
  } catch (error) {
    // NUNCA deixar virar unhandled rejection: isso derrubaria o processo inteiro
    // (Passenger: "application process exited prematurely"). O app sobe mesmo
    // com o banco indisponível; as rotas que usam o banco respondem erro limpo.
    console.error('⚠ Banco indisponível na inicialização:', error.message);
  } finally {
    if (connection) connection.release();
  }
}

// Rede de segurança extra: garante que nada derrube o processo no boot.
initializeDB().catch((e) => console.error('initializeDB falhou:', e.message));

export default pool;
