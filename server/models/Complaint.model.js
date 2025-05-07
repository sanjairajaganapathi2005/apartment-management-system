const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  complaintId: { type: String, required: true, unique: true }, 
  raisedBy: {
    email: { type: String, required: true },
    name: { type: String, required: true }
  },
  dept: { type: String, required: true }, 
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