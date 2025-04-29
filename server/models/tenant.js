const TenantSchema = new mongoose.Schema({
    tenantId: { type: String, required: true, unique: true },
    name: String,
    dob: Date,
    roomNo: String,
    age: Number,
    adhaar: String
  });
  
  module.exports = mongoose.model('Tenant', TenantSchema);
  