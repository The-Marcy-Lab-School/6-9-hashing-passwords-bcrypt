const express = require('express');
const { register, login } = require('./controllers/authControllers');
const { listUsers, updateUser, deleteUser } = require('./controllers/userControllers');
const logRoutes = require('./middleware/logRoutes');

const app = express();
app.use(express.json());
app.use(logRoutes);

// ====================================
// Auth routes
// ====================================

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// ====================================
// User routes
// ====================================

app.get('/api/users', listUsers);
app.patch('/api/users/:user_id', updateUser);
app.delete('/api/users/:user_id', deleteUser);

// ====================================
// Error handling
// ====================================

// Error-handling middleware — must have exactly four parameters
const handleError = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: 'Internal Server Error' });
};

app.use(handleError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
