const { query } = require('../config/db');

async function createUser({ username, email, passwordHash }) {
  const { rows } = await query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
    [username, email, passwordHash]
  );
  return rows[0].id;
}

async function findUserByEmail(email) {
  const { rows } = await query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return rows[0] || null;
}

module.exports = { createUser, findUserByEmail };
