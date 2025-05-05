const { query } = require('../config/db');

async function getTasksByUser(userId) {
  const { rows } = await query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
  return rows;
}

async function getTaskById(id, userId) {
  const { rows } = await query(
    'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
    [id, userId]
  );
  return rows[0] || null;
}

async function createTask({ title, description, userId }) {
  const { rows } = await query(
    'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING id',
    [title, description, userId]
  );
  return rows[0].id;
}

async function updateTask(id, { title, description }, userId) {
  await query(
    'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 AND user_id = $4',
    [title, description, id, userId]
  );
}

async function deleteTask(id, userId) {
  await query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
}

module.exports = {
  getTasksByUser,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
