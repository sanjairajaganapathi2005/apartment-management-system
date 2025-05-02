// models/Tenant.model.js

const mongoose = require("mongoose");

const TenantSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  roomNo: { type: String, required: true },
  age: { type: Number, required: true },
  adhaar: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Tenant", TenantSchema);