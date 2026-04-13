# 6-9-hashing-passwords-bcrypt

## Setup

### 1. Server

```sh
cd server

# Install dependencies
npm install

# Edit db/pool.js and update the user and password fields to match your local Postgres setup
# (On macOS you may be able to delete those fields entirely)

# Create the database (run once)
createdb users_db           # Mac
# sudo -u postgres createdb users_db   # Windows/WSL

# Seed the database with hashed passwords
node db/seed.js

# Start the server (port 3000)
npm run dev
```

### 2. Frontend

In a second terminal:

```sh
cd frontend

# Install dependencies
npm install

# Start the Vite dev server (port 5173, proxies /api → localhost:3000)
npm run dev
```

Open http://localhost:5173 in your browser.

> **Note:** There is no session. Logging in stores the current user in a JavaScript variable only — refresh the page and you are back to guest mode. That is the problem this app intentionally has. Lesson 10 fixes it with `cookie-session`.
