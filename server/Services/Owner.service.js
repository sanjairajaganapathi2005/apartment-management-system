const OwnerModel = require('../models/owner.model');
const usersService = require('./User.service');
class OwnerService {
    async registerOwner(email, password) {
        await usersService.registerUser(email, password);
    }
    async findOwnerByEmail(email) {
        const owner = await OwnerModel.find({ email });
        if (!owner) {
            throw new Error('owner not found');
        }
        return owner;

    }
    async findOwnerDetails(ownerId, email, phone, roomno, dod, adhaar) {
        try {
            const owner = await this.findOwnerByEmail(email);
            return {
                ownerId,
                email,
                phone,
                roomno,
                dod,
                adhaar
            };
        } catch (error) {
            throw new Error('Error finding owner details: ' + error.message);

        }
    }
    async updateOwnerDetails(ownerId, email, phone, roomno, dod, adhaar) {
        try {
            const owner = await this.findOwnerByEmail(email);

            const updatedOwner = await OwnerModel.findByIdAndUpdate(ownerId, {
                email,
                phone,
                roomno,
                dod,
                adhaar
            }, { new: true });
            return updatedOwner;
        } catch (error) {
            throw new Error('Error updating owner details: ' + error.message);

        }
    }
    async deleteOwner(ownerId) {
        try {
            const owner = await OwnerModel.findByIdAndDelete(ownerId);
            return owner;
        } catch (error) {
            throw new Error('Error deleting owner: ' + error.message);
        }
    }
    async getAllOwners() {
        try {
            const owners = await OwnerModel.find();
            return owners;
        } catch (error) {
            throw new Error('Error fetching owners: ' + error.message);
        }
    }
}

module.exports = new OwnerService();