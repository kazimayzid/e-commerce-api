const express = require("express");

const productRoute = express.Router();
const multer  = require('multer');
const { createProductController } = require("../../controller/productController");
// const upload = multer({ dest: 'upload/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.originalname.split(".")[1]}`)
    console.log(file.originalname.split(".")[1]);
    
  }
})

const upload = multer({ storage: storage })

productRoute.post("/createproduct",upload.single('image'), createProductController)

module.exports =productRoute