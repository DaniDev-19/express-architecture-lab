const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
} = require('./user.controller');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);

module.exports = router;
