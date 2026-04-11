\c users_db

DROP TABLE IF EXISTS users;

-- WARNING: storing passwords in plaintext is insecure.
-- Run seed.js instead to seed the database with hashed passwords.
CREATE TABLE users (
  user_id  SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

INSERT INTO users (username, password) VALUES
  ('alice', 'password123'),
  ('bob',   'hunter2');
