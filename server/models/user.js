const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // e.g., "t-101", "o-101"
  password: { type: String, required: true },
  role: { type: String, enum: ['tenant', 'owner', 'employee', 'admin'], required: true },
  referenceId: { type: String, required: true } // Link to tenantId, ownerId, etc.
});

module.exports = mongoose.model('User', UserSchema);
