const Tenant = require("../models/Tenant.model");
const User = require("../models/users.model");

const createTenantByOwner = async (req, res) => {
  try {
    const { tenantId, name, dob, adhaar, agreement, status, blockNo } = req.body;

    // Validation
    if (!tenantId || !name || !dob || !adhaar || !agreement || !blockNo) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    // Check for duplicates
    const existingTenant = await Tenant.findOne({
      $or: [{ tenantId }, { adhaar }]
    });
    if (existingTenant) {
      return res.status(409).json({ error: "Tenant with same ID or Aadhaar already exists." });
    }

    // Create and save
    const tenant = new Tenant({ tenantId, name, dob, adhaar, agreement, status, blockNo });
    await tenant.save();

    res.status(201).json({ message: "Tenant added successfully", tenant });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ All Tenants
const getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.status(200).json(tenants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Tenant
const updateTenant = async (req, res) => {
  try {
    console.log("Update request for tenantId:", req.params.id);
    const tenant = await Tenant.findOneAndUpdate(
      { tenantId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    res.json({ message: "Tenant updated successfully", tenant });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE Tenant
const deleteTenant = async (req, res) => {
  try {
    console.log("Delete request for tenantId:", req.params.id);
    const result = await Tenant.findOneAndDelete({ tenantId: req.params.id });

    if (!result) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    res.json({ message: "Tenant deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTenantByOwner,
  getAllTenants,
  updateTenant,
  deleteTenant
};
