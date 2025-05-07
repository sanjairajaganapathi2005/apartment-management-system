const OwnerService = require('../Services/Owner.service');

exports.registerOwner = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingOwner = await OwnerService.findOwnerByEmail(email);

        if (existingOwner) {
            return res.status(409).json({
                status: false,
                message: "Email already registered"
            });
        }

        const owner = await OwnerService.registerOwner(email, password);

        return res.status(201).json({
            status: true,
            message: "Registration success",
            data: owner
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
}
exports.getOwnerDetails = async (req, res) => {
    try {
        const { email } = req.params;
        const owner = await OwnerService.findOwnerByEmail(email);

        if (!owner) {
            return res.status(404).json({
                status: false,
                message: "Owner not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Owner details retrieved successfully",
            data: owner
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
}
exports.updateOwnerDetails = async (req, res) => {
    try {
        const { ownerId, email, phone, roomno, dod, adhaar } = req.body;
        const updatedOwner = await OwnerService.updateOwnerDetails(ownerId, email, phone, roomno, dod, adhaar);

        if (!updatedOwner) {
            return res.status(404).json({
                status: false,
                message: "Owner not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Owner details updated successfully",
            data: updatedOwner
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
}
exports.deleteOwner = async (req, res) => {
    try {
        const { ownerId } = req.params;
        const deletedOwner = await OwnerService.deleteOwner(ownerId);

        if (!deletedOwner) {
            return res.status(404).json({
                status: false,
                message: "Owner not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Owner deleted successfully",
            data: deletedOwner
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
}
exports.getAllOwners = async (req, res) => {
    try {
        const owners = await OwnerService.getAllOwners();

        return res.status(200).json({
            status: true,
            message: "Owners retrieved successfully",
            data: owners
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
}