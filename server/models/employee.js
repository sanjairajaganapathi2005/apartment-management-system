const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  salary: { type: Number, required: true },
  dob: { type: Date, required: true },
});

module.exports = mongoose.model("Employee", employeeSchema);
