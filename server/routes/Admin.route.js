// owner register,update,delete
// complaints

const express = require('express');
const adminRouter = express.Router();
const { registerOwner} = require('../Controllers/Admin.controller');

adminRouter.post('/registerowner', registerOwner);

module.exports = adminRouter;
