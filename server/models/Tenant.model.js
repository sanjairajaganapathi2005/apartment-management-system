// models/Tenant.model.js

const mongoose = require("mongoose");

const TenantSchema = new mongoose.Schema({
  tenantno: { type: String, required: true, unique: true },
  name: String,
  dob: Date,
  roomNo: String,
  age: Number,
  adhaar: String
});

module.exports = mongoose.model("Tenant", TenantSchema);