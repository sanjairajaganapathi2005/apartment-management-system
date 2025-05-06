const AdminService = require('../Service/Admin.service');
const bcrypt = require('bcryptjs');

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await AdminService.adminLogin(email, password);

        if (!admin) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Login success",
            data: admin
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
};

exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingAdmin = await AdminService.findAdminByEmail(email);

        if (existingAdmin) {
            return res.status(409).json({
                status: false,
                message: "Email already registered"
            });
        }

        const admin = await AdminService.registerAdmin(name, email, password);

        return res.status(201).json({
            status: true,
            message: "Registration success",
            data: admin
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
};

exports.registerOwner = async (req, res) => {
    try {
        const { ownerId, name, email, password, phone, roomNo, dob, adhaar } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newOwner = await AdminService.registerOwner(ownerId, name, email, hashedPassword, phone, roomNo, dob, adhaar);

        return res.status(201).json({
            status: true,
            message: "Registration success",
            data: newOwner
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
