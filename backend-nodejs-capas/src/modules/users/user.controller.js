const asyncHandler = require('../../utils/asyncHandler');
const userService = require('./user.service');

const getUsers = asyncHandler(async (request, response) => {
  response.json(await userService.getUsers());
});

const getUser = asyncHandler(async (request, response) => {
  response.json(await userService.getUser(request.params.id));
});

const createUser = asyncHandler(async (request, response) => {
  const user = await userService.createUser(request.body);
  response.status(201).json(user);
});

module.exports = { getUsers, getUser, createUser };
