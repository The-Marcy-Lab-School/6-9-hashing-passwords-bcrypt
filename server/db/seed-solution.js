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

  const saltRounds = 8;
  const hash1 = await bcrypt.hash('password', saltRounds);
  const hash2 = await bcrypt.hash('123secret', saltRounds);

  const query = 'INSERT INTO users (username, password_hash) VALUES ($1, $2)'
  await pool.query(query, ['alice', hash1]);
  await pool.query(query, ['bob', hash2]);

  console.log('Database seeded.');
  await pool.end(); // use pool.end for one-off scripts like seed files
};

seed();