const Tenant = require("../models/Tenant.model");

// CREATE Tenant
const addTenant = async (req, res) => {
  try {
    const { tenantId, name, dob, roomNo, age, adhaar } = req.body;

    // Validation
    if (!tenantId || !name || !dob || !roomNo || !age || !adhaar) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check for duplicates
    const existingTenant = await Tenant.findOne({
      $or: [{ tenantId }, { adhaar }]
    });
    if (existingTenant) {
      return res.status(409).json({ error: "Tenant with same ID or Aadhaar already exists." });
    }

    // Create and save
    const tenant = new Tenant({ tenantId, name, dob, roomNo, age, adhaar });
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
    console.log("Update request for tenantId:", req.params.id);  // Add this line
    const tenant = await Tenant.findOneAndUpdate(
      { tenantId: req.params.id },  // Ensure tenantId is correct
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
    console.log("Delete request for tenantId:", req.params.id);  // Add this line
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
  addTenant,
  getAllTenants,
  updateTenant,
  deleteTenant
};
