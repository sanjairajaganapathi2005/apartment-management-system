const bcrypt = require('bcrypt');
const AdminModel = require('../models/Admin.model');
const OwnerMOdel = require('../models/owner');

class AdminService {
    async adminLogin(email, password) {
        const admin = await AdminModel.findOne({ email });
        if (!admin) return null;

        const isMatch = await bcrypt.compare(password, admin.password);
        return isMatch ? admin : null;
    }

    async registerAdmin(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await AdminModel.create({
            name,
            email,
            password: hashedPassword,
            role: 'admin'
        });
        return newAdmin;
    }

    async findAdminByEmail(email) {
        return await AdminModel.findOne({ email });
    }
    async registerOwner(name, email, password, phone){
        const hashedPassword = await bcrypt.hash(password,10);
        const newOwner = await OwnerMOdel.create({
            ownerId,
            name,
            email,
            password: hashedPassword,
            phone
        });
        return newOwner;
    }
}

module.exports = new AdminService();
