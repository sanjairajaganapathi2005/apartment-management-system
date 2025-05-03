// models/Tenant.model.js

const mongoose = require("mongoose");

const TenantSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  adhaar: { type: String, required: true, unique: true },
  agreement: { type: String, required: true }, // Assuming this stores agreement details or a file reference
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  blockNo: { type: String, required: true }
});

module.exports = mongoose.model("Tenant", TenantSchema);
