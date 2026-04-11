// TODO: Import Bcrypt
const pool = require('../db/pool');

const SALT_ROUNDS = 8;

// Returns all users — never exposes password
module.exports.list = async () => {
  const { rows } = await pool.query('SELECT user_id, username FROM users ORDER BY user_id');
  return rows;
};

// Stores the user and returns user_id and username — never exposes password
// TODO: Hash the password with bcrypt before storing
// TODO: Update the column name from `password` to `password_hash`
module.exports.create = async (username, password) => {
  const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id, username';
  const { rows } = await pool.query(query, [username, password]);
  return rows[0];
};

// Returns user_id and username — never exposes password
// Used only to check whether a username is already taken (register)
// Returns null if not found
module.exports.findByUsername = async (username) => {
  const query = 'SELECT user_id, username FROM users WHERE username = $1';
  const { rows } = await pool.query(query, [username]);
  return rows[0] || null;
};

// Finds the user by username and validates the password
// Returns user_id and username if credentials match — never exposes password
// Returns null if not found or password doesn't match
// TODO: Use bcrypt.compare to validate against user.password_hash instead of ===
module.exports.validatePassword = async (username, password) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const { rows } = await pool.query(query, [username]);
  const user = rows[0];
  if (!user || user.password !== password) return null;
  return { user_id: user.user_id, username: user.username };
};

// Updates the user's password and returns user_id and username — never exposes password
// Returns null if not found
// TODO: Hash the password with bcrypt before updating
// TODO: Update the column name from `password` to `password_hash`
module.exports.update = async (user_id, password) => {
  const query = 'UPDATE users SET password = $1 WHERE user_id = $2 RETURNING user_id, username';
  const { rows } = await pool.query(query, [password, user_id]);
  return rows[0] || null;
};

// Deletes the user and returns user_id and username
// Returns null if not found
module.exports.destroy = async (user_id) => {
  const query = 'DELETE FROM users WHERE user_id = $1 RETURNING user_id, username';
  const { rows } = await pool.query(query, [user_id]);
  return rows[0] || null;
};
