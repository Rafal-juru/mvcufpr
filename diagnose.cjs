// Diagnóstico rápido — rode via "Executar comandos do Node.js" no Plesk
// Depois delete este arquivo.
const mysql = require ? require('mysql2/promise') : null;

async function run() {
  console.log('=== ENV VARS ===');
  console.log('DB_HOST     :', process.env.DB_HOST     || '(não definido)');
  console.log('DB_USER     :', process.env.DB_USER     || '(não definido)');
  console.log('DB_NAME     :', process.env.DB_NAME     || '(não definido)');
  console.log('DB_PASSWORD :', process.env.DB_PASSWORD ? '(definido)' : '(NÃO definido)');
  console.log('JWT_SECRET  :', process.env.JWT_SECRET  ? '(definido)' : '(NÃO definido)');
  console.log('PORT        :', process.env.PORT        || '(não definido)');
  console.log('NODE_ENV    :', process.env.NODE_ENV    || '(não definido)');

  console.log('\n=== TESTE DE CONEXÃO MySQL ===');
  try {
    const { createConnection } = await import('mysql2/promise');
    const conn = await createConnection({
      host    : process.env.DB_HOST     || 'localhost',
      user    : process.env.DB_USER     || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME     || 'mvcufpr',
      connectTimeout: 8000,
    });
    const [rows] = await conn.query('SELECT COUNT(*) AS total FROM posts');
    console.log('Conexão OK — posts no banco:', rows[0].total);
    await conn.end();
  } catch (err) {
    console.error('Conexão FALHOU:', err.message);
  }
}

run().catch(console.error);
