import pool from '../config/db.js';

export async function listUsers(req, res, next) {
  try {
    const [rows] = await pool.query(
      'SELECT id, full_name, email, created_at FROM users ORDER BY id DESC'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const [rows] = await pool.query(
      'SELECT id, full_name, email, created_at FROM users WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res, next) {
  try {
    const { full_name, email } = req.body;
    if (!full_name || !email) {
      return res.status(400).json({ error: 'full_name and email are required' });
    }
    const [result] = await pool.query(
      'INSERT INTO users (full_name, email) VALUES (?, ?)',
      [full_name, email]
    );
    res.status(201).json({ id: result.insertId, full_name, email });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already registered' });
    }
    next(err);
  }
}
