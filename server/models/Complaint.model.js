const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  description: { type: String, required: true },
  blockNo: { type: String, required: true },
  roomNo: { type: String, required: true },
  raisedBy: { type: String, required: true }, // tenantId or ownerId
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
