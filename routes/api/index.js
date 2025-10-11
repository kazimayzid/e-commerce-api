const express = require("express");
const authRoutes = require("./auth");
const homeRoutes = require("./home");
const adminRoute = require("./admin");
const categoryRoute = require("./category");
const subCategoryRoute = require("./subCategory");
const apiRoutes = express.Router();

apiRoutes.use("/auth", authRoutes)
apiRoutes.use("/home", homeRoutes)
apiRoutes.use("/admin", adminRoute)
apiRoutes.use("/category", categoryRoute)
apiRoutes.use("/subcategory", subCategoryRoute)
module.exports = apiRoutes