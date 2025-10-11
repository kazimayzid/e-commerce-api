const express = require("express");
const createCategoryController = require("../../controller/categoryController");
const categoryRoute = express.Router();

categoryRoute.post("/createcategory", createCategoryController)

module.exports = categoryRoute