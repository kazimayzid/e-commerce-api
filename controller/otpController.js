const { set } = require("mongoose");
const emailValidation = require("../helpers/emailValidation");
const userSchema = require("../model/userSchema");

async function otpController(req, res) {
  const { email, otp } = req.body;

  const existingUser = await userSchema.findOne({ email });

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "plz enter your email",
    });
  }
  if (!otp) {
    return res.status(400).json({
      success: false,
      message: "plz enter your otp",
    });
  }
  if (!emailValidation(email)) {
    return res.status(400).json({
      success: false,
      message: "plz give a valied email",
    });
  }
  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "this email is not registered",
    });
  }
  if (existingUser.otp !== otp) {
    return res.status(400).json({
      success: false,
      message: "otp is not matched",
    });
  }
  if (existingUser.otpExpire < Date.now()) {
    return res.status(400).json({
      success: false,
      message: "otp is expired",
    });
  }

  const userVerification = await userSchema.findOneAndUpdate(
    { email },
    {
      $set: { isVerified: true },
      $unset: { otp: "", otpExpire: "" },
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "your verification is done"
  })
}
module.exports = otpController;
