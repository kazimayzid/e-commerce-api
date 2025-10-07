const emailValidation = require("../helpers/emailValidation");
const emailVerification = require("../helpers/emailVerification");
const hashPassword = require("../helpers/hashPassword");
const {generatedOtp, otpExpire} = require("../helpers/otpGenerator");
const userSchema = require("../model/userSchema");
async function registrationController(req, res) {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName) {
    return res.status(400).json({
      success: false,
      message: "plz give your firstName",
    });
  }
  if (!lastName) {
    return res.status(400).json({
      success: false,
      message: "plz give your lastName",
    });
  }
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "plz give your email",
    });
  }
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "plz give your password",
    });
  }
  if (!emailValidation(email)) {
    return res.status(400).json({
      success: false,
      message: "plz give a valied email",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "plz give at least 6 digit",
    });
  }
  const existingUser = await userSchema.findOne({email})
 if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "this email is already exist",
    });
 }
const otp = generatedOtp();
 emailVerification(email, otp)

 const hashedPassword = await hashPassword(password);
  const user = new userSchema({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    role: role || "user",
    otp: otp,
    otpExpire: otpExpire()
  });
  await user.save();
    res.status(200).json({
      success: true,
      message: "registration successful",
      data: user,
    });
}
module.exports = registrationController;
