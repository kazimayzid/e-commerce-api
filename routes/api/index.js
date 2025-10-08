const express = require("express");
const authRoutes = require("./auth");
const homeRoutes = require("./home");
const adminRoute = require("./admin");
const apiRoutes = express.Router();

apiRoutes.use("/auth", authRoutes)
apiRoutes.use("/home", homeRoutes)
apiRoutes.use("/admin", adminRoute)
module.exports = apiRoutes