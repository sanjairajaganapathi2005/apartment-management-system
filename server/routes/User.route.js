const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, deleteUserById } = require('../Controllers/User.controller');

const usersRouter = express.Router();

usersRouter.get('/all', getAllUsers);
usersRouter.put('/', updateUser);
usersRouter.delete('/:id', deleteUserById);

module.exports = usersRouter;