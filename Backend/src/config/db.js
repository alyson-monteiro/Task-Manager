//Here we are going to connect to the database, using the dotenv to get the env vars from the .env file.
// Import dotenv
require('dotenv').config();

// print on cosole the env vars:
console.log(
  '→ DB_HOST:', process.env.DB_HOST,
  'DB_PORT:', process.env.DB_PORT,
  'DB_USER:', process.env.DB_USER,
  'DB_PASS:', process.env.DB_PASS,
  'DB_NAME:', process.env.DB_NAME,
  'tipo DB_PASS:', typeof process.env.DB_PASS
);

// Create a connection pool to the database.
const { Pool } = require('pg');
const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

pool
  .connect()
  .then(client => {
    console.log(`Conected to PostgreSQL on ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    client.release();
  })
  .catch(err => {
    console.error('Failed to connect to PostgreSQL:', err);
  });

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
