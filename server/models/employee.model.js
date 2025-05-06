const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dept: { type: String, required: true }, // <-- ADD THIS
  salary: { type: Number, required: true },
  aadharNo: { type: String, required: true }, // <-- ADD THIS
  dob: { type: Date, required: true },
});

module.exports = mongoose.model("Employee", employeeSchema);
