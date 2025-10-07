const express = require("express");
const authRoutes = require("./auth");
const apiRoutes = express.Router();

apiRoutes.use("/auth", authRoutes)

module.exports = apiRoutes