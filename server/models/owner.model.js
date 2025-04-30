// models/Owner.js

const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema({
  ownerId: { type: String, required: true, unique: true },
  name: String,
  age: Number,
  agreementStatus: String,
  roomNo: String,
  dob: Date,
  adhaar: String
});

module.exports = mongoose.model('Owner', OwnerSchema);
