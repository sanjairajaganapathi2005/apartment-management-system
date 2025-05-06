const express = require('express');
const {
    registerUser,
    loginUser,
    requestOtp,
    requestResetPassword,
    resetPassword,
} = require('../controllers/auth.controller');

const authRouter = express.Router();

// 📌 Authentication Routes
authRouter.post('/register', registerUser);         // Registration using verified OTP
authRouter.post('/login', loginUser);               // Login with email/password

// 📌 OTP Handling
authRouter.post('/request-otp', requestOtp);        // Request OTP for registration

// 📌 Password Reset Flow
authRouter.post('/request-reset-password', requestResetPassword); // Send OTP to reset password
authRouter.put('/reset-password', resetPassword);                 // Reset password with verified OTP

module.exports = authRouter;
