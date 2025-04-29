const EmployeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    name: String,
    salary: Number,
    dob: Date
  });
  
  module.exports = mongoose.model('Employee', EmployeeSchema);
  