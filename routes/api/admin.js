const express = require("express");

const adminRoute = express.Router();

adminRoute.get("/welcome", (req, res) => {
    res.send("heloo")
});

module.exports = adminRoute;
