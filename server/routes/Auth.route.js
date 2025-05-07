const express = require('express');
const {
    registerUser,
    loginUser,
    requestOtp,
    requestResetPassword,
    resetPassword,
} = require('../Controllers/Auth.controller');

const authRouter = express.Router();


authRouter.post('/register', registerUser);         
authRouter.post('/login', loginUser);              

// 📌 OTP Handling
authRouter.post('/request-otp', requestOtp);        
authRouter.post('/request-reset-password', requestResetPassword); 
authRouter.put('/reset-password', resetPassword);                 

module.exports = authRouter;
