const express = require("express");
const authMiddelWare = require("../../middleware/authMiddleware");

const homeRoutes = express.Router()

homeRoutes.get("/welcome", authMiddelWare, (req, res) => {
    console.log(req.userInfo);
    const {userid, firstName, email, role} = req.userInfo
   return res.status(200).json({
        success: true,
        messege: " welcome to dashBoard",
        data:{
            _id: userid,
            firstName: firstName,
            email: email,
            role: role
        }
    })
})

module.exports = homeRoutes