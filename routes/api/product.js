const express = require("express");

const productRoute = express.Router();
const multer = require("multer");
const {
  createProductController,
  getAllProductController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
} = require("../../controller/productController");
// const upload = multer({ dest: 'upload/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        `.${file.originalname.split(".")[1]}`
    );
    console.log(file.originalname.split(".")[1]);
  },
});

const upload = multer({ storage: storage });

productRoute.post(
  "/createproduct",
  upload.single("image"),
  createProductController
);
productRoute.get(
  "/getallproduct",
  upload.single("image"),
  getAllProductController
);
productRoute.get(
  "/getsingleproduct/:id",
  upload.single("image"),
  getSingleProductController
);
productRoute.patch(
  "/updateproduct/:id",
  upload.single("image"),
  updateProductController
);
productRoute.delete(
  "/deleteproduct/:id",
  upload.single("image"),
  deleteProductController
);

module.exports = productRoute;
