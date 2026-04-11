const userModel = require('../models/userModel');

const listUsers = async (req, res, next) => {
  try {
    const users = await userModel.list();
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = await userModel.update(req.params.user_id, password);
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await userModel.destroy(req.params.user_id);
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { listUsers, updateUser, deleteUser };
