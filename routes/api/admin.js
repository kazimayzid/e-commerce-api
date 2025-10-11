const express = require("express");
const authMiddelWare = require("../../middleware/authMiddleware");

const adminRoute = express.Router();

adminRoute.get("/welcome",authMiddelWare, (req, res) => {
    const {userid, firstName, email, role} = req.userInfo;

    if (role === "admin") {
        res.status(200).json({
            success: true,
            messege: " welcome to admin"
        })
    } else {
        res.status(400).json({
            success: false,
            messege: " you are not admin"
        })
    }
});

module.exports = adminRoute;
