const OtpToken = require('../models/otp.model');
const User = require('../models/users.model');
const { sendOtpEmail } = require('../Services/email.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 📌 Request OTP for Registration
const requestOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await OtpToken.create({ email, otp });
  await sendOtpEmail(email, otp);

  res.status(200).json({ message: 'OTP sent to email' });
};

// 📌 Verify OTP and Register User
const registerUser = async (req, res) => {
  const { email, otp, password, role, referenceId } = req.body;

  const token = await OtpToken.findOne({ email, otp });
  if (!token) return res.status(400).json({ message: 'Invalid or expired OTP' });

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ email, password: hashedPassword, role, referenceId });
  await OtpToken.deleteMany({ email });

  res.status(201).json({ message: 'User registered successfully' });
};

// 📌 Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(200).json({ token, user });
};

// 📌 Request Reset Password (OTP)
const requestResetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Email not found' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await OtpToken.create({ email, otp });
  await sendOtpEmail(email, otp);

  res.status(200).json({ message: 'Reset OTP sent to email' });
};

// 📌 Reset Password with OTP
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const token = await OtpToken.findOne({ email, otp });
  if (!token) return res.status(400).json({ message: 'Invalid or expired OTP' });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashedPassword });
  await OtpToken.deleteMany({ email });

  res.status(200).json({ message: 'Password reset successful' });
};

module.exports = {
  requestOtp,
  registerUser,
  loginUser,
  requestResetPassword,
  resetPassword,
};
