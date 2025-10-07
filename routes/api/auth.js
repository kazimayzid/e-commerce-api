const express = require("express");
const registrationController = require("../../controller/registrationController");
const otpController = require("../../controller/otpController");
const reSendOtp = require("../../helpers/reSendOtp");
const logInController = require("../../controller/logInController");
const authRoutes = express.Router()

authRoutes.use("/registration", registrationController)
authRoutes.use("/otp", otpController)
authRoutes.use("/resendotp", reSendOtp)
authRoutes.use("/login", logInController)
module.exports = authRoutes