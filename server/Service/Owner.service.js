// controllers/Owner.server.js

const Tenant = require("../models/Tenant");  // Assuming this is the Tenant Mongoose model
const TenantProof = require("../models/TenantProof");  // Assuming this is the TenantProof model
const User = require("../models/User");  // Assuming this is the User model

const createTenantByOwner = async (req, res) => {
  try {
    const { name, age, tenantno, adhaar, roomno, password, dob } = req.body;

    // 1. Create Tenant
    const newTenant = new Tenant({
      tenantno,
      name,
      dob,
      roomno,
      age
    });

    await newTenant.save();

    // 2. Create Tenant Proof
    const newTenantProof = new TenantProof({
      adhaar,
      tenantno
    });

    await newTenantProof.save();

    // 3. Create User ID
    const newUser = new User({
      username: `t-${tenantno}`,
      password,
      tenantno
    });

    await newUser.save();

    // Respond back to the client
    res.status(200).send("Tenant registered successfully");

  } catch (err) {
    console.error("Error during tenant registration:", err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createTenantByOwner
};
