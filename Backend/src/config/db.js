// src/config/db.js
// 1) Carregue as variáveis de ambiente (caso ainda não faça isso aqui):
require('dotenv').config();

// 2) Debug rápido das suas env vars:
console.log(
  '→ DB_HOST:', process.env.DB_HOST,
  'DB_PORT:', process.env.DB_PORT,
  'DB_USER:', process.env.DB_USER,
  'DB_PASS:', process.env.DB_PASS,
  'DB_NAME:', process.env.DB_NAME,
  'tipo DB_PASS:', typeof process.env.DB_PASS
);

// 3) Importa o Pool e cria a conexão
const { Pool } = require('pg');
const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// … resto do arquivo (connect, catch, export)


pool
  .connect()
  .then(client => {
    console.log(`Conectado ao PostgreSQL em ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    client.release();
  })
  .catch(err => {
    console.error('Falha ao conectar no PostgreSQL:', err);
  });

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
