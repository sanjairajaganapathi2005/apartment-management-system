const ComplaintSchema = new mongoose.Schema({
    complaintId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    description: String,
    blockNo: String,
    roomNo: String,
    raisedBy: String, // could be tenantId or ownerId
    date: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Complaint', ComplaintSchema);
  