const MaintenancePaymentSchema = new mongoose.Schema({
    tenantId: String,
    paidOn: { type: Date, default: Date.now },
    amount: Number
  });
  
  module.exports = mongoose.model('MaintenancePayment', MaintenancePaymentSchema);
  