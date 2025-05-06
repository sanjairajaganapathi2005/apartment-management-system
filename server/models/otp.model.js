const mongoose = require("mongoose");

const otpTokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // expires in 5 mins
});

module.exports = mongoose.model("OtpToken", otpTokenSchema);
