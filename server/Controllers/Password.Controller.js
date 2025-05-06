exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
    await OtpToken.create({ email, otp });
    await sendOtpEmail(email, otp);
  
    res.status(200).json({ message: "Reset OTP sent" });
  };

  

  const bcrypt = require("bcrypt");

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const token = await OtpToken.findOne({ email, otp });

  if (!token) return res.status(400).json({ message: "Invalid or expired OTP" });

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashed });
  await OtpToken.deleteMany({ email });

  res.status(200).json({ message: "Password updated" });
};
