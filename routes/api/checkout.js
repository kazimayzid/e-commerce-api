const express = require("express");
const { createCheckOutController } = require("../../controller/checkoutController");
const checkOutRoute = express.Router();

checkOutRoute.post( "/createcheckout", createCheckOutController)

module.exports = checkOutRoute;