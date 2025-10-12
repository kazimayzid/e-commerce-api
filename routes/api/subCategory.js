const express = require("express");
const {
  createSubCategory,
  getAllSubCategory,
  getSingleSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryController,
} = require("../../controller/subCategoryController");
const subCategoryRoute = express.Router();

subCategoryRoute.post("/createsubcategory", createSubCategory);
subCategoryRoute.get("/getallsubcategory", getAllSubCategory);
subCategoryRoute.get("/getsinglesubcategory/:id", getSingleSubCategoryController);
subCategoryRoute.patch("/updatesubcategory/:id", updateSubCategoryController);
subCategoryRoute.delete("/deletesubcategory/:id", deleteSubCategoryController)

module.exports = subCategoryRoute;
