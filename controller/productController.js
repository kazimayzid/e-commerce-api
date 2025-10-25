const uploadImg = require("../helpers/cloudinary");
const productSchema = require("../model/productSchema");
const subCatagorySchema = require("../model/subCatagorySchema");

async function createProductController(req, res) {
  try {
    const {
      name,
      description,
      price,
      stock,
      image,
      rating,
      discount,
      sold,
      subCategory,
    } = req.body;

    const imgName = req.file.filename;
    const imgPath = req.file.path;
    const imgURL = await uploadImg(imgPath);

    if (!name) {
      return res.status(400).json({
        success: false,
        messege: "Name is required",
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        messege: "description is required",
      });
    }
    if (!price) {
      return res.status(400).json({
        success: false,
        messege: "price is required",
      });
    }
    if (!subCategory) {
      return res.status(400).json({
        success: false,
        messege: "Subcategory is required",
      });
    }

    const alredyExistPorduct = await productSchema.findOne({ name });
    if (alredyExistPorduct) {
      return res.status(400).json({
        success: false,
        messege: "This product alredy exist",
      });
    }

    const productData = await new productSchema({
      name,
      description,
      price,
      stock,
      image: imgURL.secure_url,
      rating,
      discount,
      sold,
      subCategory,
    });

    productData.save();

    await subCatagorySchema.findByIdAndUpdate(
      subCategory,
      {
        $push: { product: productData._id },
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      success: true,
      messege: "product data is saved in DB successfully",
      data: productData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messege: "Something is wrong in server",
      error: error,
    });
  }
}
async function getAllProductController(req, res) {
  try {
    const product = await productSchema.find()
    res.status(200).json({
      success: true,
      messege: "Data of all products",
      data: product
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      messege: "Something is wrong in server",
      error: error,
    });
  }
}

module.exports = { createProductController, getAllProductController };
