const userRepository = require('./user.repository');

const getUsers = () => userRepository.findAll();

const getUser = async (id) => {
  const user = await userRepository.findById(id);

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const createUser = async (data) => {
  if (!data.name || !data.email) {
    const error = new Error('name and email are required');
    error.statusCode = 400;
    throw error;
  }

  return userRepository.create({
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
  });
};

module.exports = { getUsers, getUser, createUser };
