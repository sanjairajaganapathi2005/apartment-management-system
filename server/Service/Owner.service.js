const Tenant = require("../models/Tenant.model");
const User = require("../models/User.model");

const createTenantByOwner = async (req, res) => {
  try {
    const { name, age, tenantno, adhaar, roomno, password, dob } = req.body;

    // Basic validation
    if (!tenantno || !name || !dob || !roomno || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if tenant already exists
    const existingTenant = await Tenant.findOne({ tenantno });
    if (existingTenant) {
      return res.status(409).json({ error: "Tenant number already exists" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: `t-${tenantno}` });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Create and save tenant
    const newTenant = new Tenant({
      tenantno,
      name,
      dob,
      roomNo: roomno,
      age,
      adhaar
    });
    await newTenant.save();

    // Create and save user
    const newUser = new User({
      email: `t-${tenantno}`,
      password,
      referenceId: tenantno,
      role: "tenant"
    });
    await newUser.save();

    res.status(200).json({ message: "Tenant registered successfully" });

  } catch (err) {
    console.error("Error during tenant registration:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTenantByOwner
};
