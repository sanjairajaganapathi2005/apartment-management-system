const Employee = require("../models/employee.model.js");

// CREATE
exports.registerEmployee = async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const employee = new Employee(req.body);
    await employee.save();
    res
      .status(201)
      .json({ message: "Employee registered successfully", employee });
  } catch (err) {
    console.error("Error registering employee:", err);
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { employeeId: req.params.id },
      req.body,
      { new: true }
    );
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee updated successfully", employee });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteEmployee = async (req, res) => {
  try {
    const result = await Employee.findOneAndDelete({
      employeeId: req.params.id,
    });
    if (!result) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
