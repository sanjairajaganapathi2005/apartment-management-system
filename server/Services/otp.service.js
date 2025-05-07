const OtpModel = require('../models/otp.model');

class OtpService {
  generateOtp() {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
  }

  async genOtp(email, reason) {
    const otp = this.generateOtp();

    const otpDoc = await OtpModel.create({
      email,
      otp,
      reason,
    });
    return { otp, id: otpDoc._id };
  }


  async compare(id, inputOtp) {
    const otpDoc = await OtpModel.findById(id);
    if (!otpDoc) throw new Error("OTP not found");

    if (otpDoc.isVerified) throw new Error("OTP already verified");

    if (otpDoc.otp !== inputOtp) throw new Error("Invalid OTP");

    otpDoc.isVerified = true;
    await otpDoc.save();
  }
}

module.exports = new OtpService();
