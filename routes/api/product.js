const express = require("express");
const { createProductController } = require("../../controller/productController");
const productRoute = express.Router();

productRoute.post("/createproduct", createProductController)

module.exports =productRoute