const express = require("express");
const createSubCategory = require("../../controller/subCategoryController");
const subCategoryRoute = express.Router();

subCategoryRoute.post("/createsubcategory", createSubCategory)


module.exports = subCategoryRoute