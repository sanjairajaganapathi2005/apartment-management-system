
const express = require('express');
const adminRouter = express.Router();
const { adminLogin, registerAdmin , registerOwner} = require('../Controllers/Admin.controller');

adminRouter.post('/registerowner', registerOwner);

module.exports = adminRouter;
