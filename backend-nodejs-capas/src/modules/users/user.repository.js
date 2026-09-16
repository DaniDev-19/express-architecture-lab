const pool = require('../../db/pool');

const findAll = async () => {
  const result = await pool.query(
    'SELECT id, name, email, created_at FROM users ORDER BY id DESC',
  );
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query(
    'SELECT id, name, email, created_at FROM users WHERE id = $1',
    [id],
  );
  return result.rows[0] || null;
};

const create = async ({ name, email }) => {
  const result = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at',
    [name, email],
  );
  return result.rows[0];
};

module.exports = { findAll, findById, create };
