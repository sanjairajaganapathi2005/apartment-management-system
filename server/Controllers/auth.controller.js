const Joi = require('joi');
const { REASON } = require('../constants/enum.constants');
const emailService = require('../services/email.service');
const otpService = require('../services/otp.service');
const tokenService = require('../services/token.service');
const usersService = require('../services/users.service');

// REGISTER
exports.registerUser = async function (req, res) {
    try {
        const payloadValidator = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            role: Joi.string().valid('tenant', 'owner', 'employee', 'admin').required(),
            referenceId: Joi.string().required()
        });

        const { error, value } = payloadValidator.validate(req.body);
        if (error) throw new Error(error.details[0].message);

        const { email, password, role, referenceId } = value;

        await usersService.registerUser(email, password, role, referenceId);
        const user = await usersService.getUserByEmail(email);

        const tokenPayload = {
            id: user._id,
            email: user.email,
            role: user.role,
            referenceId: user.referenceId
        };

        const token = tokenService.genToken(tokenPayload);

        res.status(200).json({
            status: true,
            message: 'Registration successful',
            token: token
        });
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
};

// LOGIN
exports.loginUser = async function (req, res) {
    try {
        const payloadValidator = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        const { error, value } = payloadValidator.validate(req.body);
        if (error) throw new Error(error.details[0].message);

        const { email, password } = value;

        await usersService.login(email, password);
        const user = await usersService.getUserByEmail(email);

        const tokenPayload = {
            id: user._id,
            email: user.email,
            role: user.role,
            referenceId: user.referenceId
        };

        const token = tokenService.genToken(tokenPayload);

        res.status(200).json({
            status: true,
            message: 'Login successful',
            token: token
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
};

// OTP + PASSWORD RESET (unchanged, still compatible)

exports.requestOtp = async function (req, res) {
    try {
        const { email } = req.body;
        const { status } = await usersService.isUserEmailExists(email);
        if (!status) throw new Error('Email not found');

        const { otp, _id } = await otpService.genOtp(email, REASON.VERIFY);
        await emailService.sendOtp(email, otp);

        res.status(200).json({
            status: true,
            message: 'OTP sent to your email',
            data: { id: _id }
        });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

exports.verifyOtp = async function (req, res) {
    try {
        const { id, otp } = req.body;
        await otpService.compare(id, otp);
        res.status(200).json({ status: true, message: 'OTP verified' });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

exports.requestResetPassword = async function (req, res) {
    try {
        const { email } = req.body;
        const { status, data } = await usersService.isUserEmailExists(email);
        if (!status) throw new Error('Email not found');

        const tokenPayload = { userId: data._id, email };
        const resetToken = tokenService.genToken(tokenPayload);
        await emailService.sendPasswordResetToken(email, resetToken);

        res.status(200).json({
            status: true,
            message: 'Password reset link sent to your email'
        });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

exports.resetPassword = async function (req, res) {
    try {
        const { newPassword, token } = req.body;
        const decoded = tokenService.verifyToken(token);
        if (!decoded.userId) throw new Error('Invalid token payload');

        await usersService.updatePassword(decoded.userId, newPassword);
        res.status(200).json({
            status: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

exports.verifyAuthToken = async function (req, res) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = tokenService.verifyToken(token);

        res.status(200).json({
            status: true,
            message: 'Token is valid',
            data: decoded
        });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};
