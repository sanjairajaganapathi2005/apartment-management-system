// controllers/Owner.server.js

const Tenant = require("../models/Tenant.model");
const User = require("../models/User.model");

const createTenantByOwner = async (req, res) => {
  try {
    const { name, age, tenantno, adhaar, roomno, password, dob } = req.body;

    const newTenant = new Tenant({
      tenantno,
      name,
      dob,
      roomNo: roomno,
      age,
      adhaar
    });

    await newTenant.save();

    const newUser = new User({
      email: `t-${tenantno}`,
      password,
      referenceId: tenantno,
      role: "tenant"
    });

    await newUser.save();

    res.status(200).send("Tenant registered successfully");
  } catch (err) {
    console.error("Error during tenant registration:", err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createTenantByOwner
};