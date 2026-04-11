// db/seed.js
const bcrypt = require('bcrypt');
const pool = require('./pool');

const seed = async () => {
  await pool.query('DROP TABLE IF EXISTS users');
  await pool.query(`
    CREATE TABLE users (
      user_id       SERIAL PRIMARY KEY,
      username      TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    )
  `);

  // TODO: generate two hashes using bcrypt.hash(str, saltRounds)
  const saltRounds = 8;
  const hash1 = '...';
  const hash2 = '...';

  // TODO: write an INSERT INTO query and execute it with pool.query(query, params)
  const query = '...'

  console.log('Database seeded.');
  await pool.end(); // use pool.end for one-off scripts like seed files
};

seed();