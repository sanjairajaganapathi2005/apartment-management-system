const otpService = require("../Services/otp.service");
const bcrypt = require("bcrypt");
const OtpToken = require("../models/otp.model");
const { sendOtpEmail } = require("../Services/email.service");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const { otp, id } = otpService.genOtp(email, "forget");
  try {
    await sendOtpEmail(email, otp); 
    res.status(200).json({ message: "Reset OTP sent", id });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, id, otp } = req.body;
  try {
    const isValid = await otpService.compare(email, id, otp); 
    if (!isValid) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};


exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const token = await OtpToken.findOne({ email, otp });

  if (!token) return res.status(400).json({ message: "Invalid or expired OTP" });

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashed });
  await OtpToken.deleteMany({ email });

  res.status(200).json({ message: "Password updated" });
};
