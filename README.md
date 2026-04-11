# 6-9-hashing-passwords-bcrypt

## Setup

```sh
# cd into server
cd server

# Install dependencies
npm install

# Edit db/pool.js and update the user and password fields to match your local Postgres setup
# (On macOS you may be able to delete those fields entirely)

# Create the database (run once)
createdb users_db           # Mac
# sudo -u postgres createdb users_db   # Windows/WSL

# Initialize the schema
psql -f db/seed.sql                    # Mac
sudo -u postgres psql -f db/seed.sql   # Windows/WSL

# Start the server
npm run dev
```
