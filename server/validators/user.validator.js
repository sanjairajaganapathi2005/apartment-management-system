// user.validator.js
const Joi = require('joi');

exports.registerUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('tenant', 'owner', 'employee', 'admin').required(),
    referenceId: Joi.string().required(),
});
