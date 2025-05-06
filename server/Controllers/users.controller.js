const usersService = require('../services/users.service');
const userValidator = require('../validators/user.validator');

// REGISTER USER
exports.registerUser = async (req, res) => {
    try {
        const { error, value } = userValidator.registerUser.validate(req.body);
        if (error) throw new Error(error.details[0].message);

        const { email, password, role, referenceId } = value;
        await usersService.registerUser(email, password, role, referenceId);

        res.status(201).json({
            status: true,
            message: 'User registration successful',
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};

// GET ALL USERS
exports.getAllUsers = async (_req, res) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json({
            status: true,
            message: 'Retrieved all users successfully',
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    try {
        const { error, value } = userValidator.updateUser?.validate(req.body) || {};
        if (error) throw new Error(error.details[0].message);

        await usersService.updateUser(value || req.body);

        res.status(200).json({
            status: true,
            message: 'User updated successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};

// DELETE USER BY ID
exports.deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        await usersService.deleteUserById(userId);

        res.status(200).json({
            status: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message,
        });
    }
};
