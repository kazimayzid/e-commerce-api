const userSchema = require("../model/userSchema");
const emailVerification = require("./emailVerification");
const { generatedOtp, otpExpire } = require("./otpGenerator");

async function reSendOtp(req, res) {
  const { email } = req.body;
  let user = await userSchema.findOne({ email });

  if (!user) {
    res.status(400).json({ success: false, message: "user not found" });
    return;
  }

  const otp = generatedOtp();
  emailVerification(otp);
  await userSchema.findOneAndUpdate(
    { email },
    { $set: { otp: otp, otpExpire: otpExpire() } },
    { new: true }
  );

  res.status(201).json({
    success: true,
    message: "check your email",
  });
}
module.exports = reSendOtp;
