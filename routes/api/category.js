const express = require("express");
const {
  createCategoryController,
  getCategoryController,
  getsinglecategory,
  updateCategoryController,
  deleteCategoryController,
} = require("../../controller/categoryController");
const categoryRoute = express.Router();

categoryRoute.post("/createcategory", createCategoryController);
categoryRoute.get("/getcategory", getCategoryController);
categoryRoute.get("/getsinglecategory/:id", getsinglecategory);
categoryRoute.patch("/updatecategory/:id", updateCategoryController);
categoryRoute.delete("/deletecategory/:id", deleteCategoryController);
module.exports = categoryRoute;
