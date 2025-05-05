const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  complaintId: { type: String, required: true, unique: true }, // Explicit Complaint ID
  raisedBy: {
    email: { type: String, required: true },
    name: { type: String, required: true }
  },
  dept: { type: String, required: true }, // Department the complaint is related to
  description: { type: String, required: true },
  blockNo: { type: String, required: true },
  roomNo: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Register", "in progress", "resolved"],
    default: "open"
  }
});

module.exports = mongoose.model("Complaint", ComplaintSchema);