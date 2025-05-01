// login
// owner regiater
// get tenant details
// get owner details
// compains
// parking allocations
// empolyees

const express = require('express');
const adminRouter = express.Router();
const { adminLogin, registerAdmin , registerOwner} = require('../Controller/Admin.controller');

adminRouter.post('/login', adminLogin);
adminRouter.post('/register', registerAdmin);
adminRouter.post('/registerowner', registerOwner);

module.exports = adminRouter;
