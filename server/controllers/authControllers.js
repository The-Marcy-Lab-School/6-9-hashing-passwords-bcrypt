const userModel = require('../models/userModel');

// POST /api/auth/register { username, password }
const register = async (req, res, next) => {
  try {
    // 1. Pull the username and password out of the request body
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ error: 'Username and password are required.' });
    }

    // 2. Check if the username is already taken
    const existingUser = await userModel.findByUsername(username);
    if (existingUser) {
      return res.status(400).send({ message: 'Username already taken' });
    }

    // 3. Store the new user — the model returns only user_id and username, never the password
    const user = await userModel.create(username, password);

    // 4. Respond with the new user and a 201 Created status
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    // 1. Pull the username and password out of the request body
    const { username, password } = req.body;

    // 2. Validate credentials — the model handles the lookup and comparison
    //    Returns user_id and username if valid, null otherwise.
    //    We return the same generic message for both cases so an attacker
    //    can't tell whether the username or password was wrong
    const user = await userModel.validatePassword(username, password);
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    // 3. Credentials are valid — respond with user_id and username
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
