const express = require("express");
const registrationController = require("../../controller/registrationController");
const authRoutes = express.Router()

authRoutes.use("/registration", registrationController)
 

module.exports = authRoutes