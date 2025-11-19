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
        message: "Name is required",
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "description is required",
      });
    }
    if (!price) {
      return res.status(400).json({
        success: false,
        message: "price is required",
      });
    }
    if (!subCategory) {
      return res.status(400).json({
        success: false,
        message: "Subcategory is required",
      });
    }

    const alredyExistPorduct = await productSchema.findOne({ name });
    if (alredyExistPorduct) {
      return res.status(400).json({
        success: false,
        message: "This product alredy exist",
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
      message: "product data is saved in DB successfully",
      data: productData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something is wrong in server",
      error: error,
    });
  }
}
// Get All Product ======================================
async function getAllProductController(req, res) {
  try {
    const page = req.query.page;
    console.log(page);
    const size = req.query.size;
    console.log("size:", size);

    const allPrduct = await productSchema.countDocuments({});
    console.log(allPrduct);
    const skipSize = (page - 1) * size;
    const product = await productSchema.find().limit(size).skip(skipSize);
    res.status(200).json({
      success: true,
      message: "Data of all products",
      data: product,
      total: allPrduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something is wrong in server",
      error: error,
    });
  }
}

async function getSingleProductController(req, res) {
  try {
    const { id } = req.params;
    const data = await productSchema.findById(id);

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "There is no data like this",
      });
    }

    res.status(200).json({
      success: true,
      message: "This is your searching data",
      data: data,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something is wrong in server",
      error: error,
    });
  }
}

async function updateProductController(req, res) {
  try {
    const { id } = req.params;
    const updateFields = {};

    const allowedFields = [
      "name",
      "description",
      "price",
      "stock",
      "rating",
      "discount",
      "subCategory",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    if (req.file) {
      const imgURL = await uploadImg(req.file.path);
      updateFields.image = imgURL.secure_url;
    }

    const updatedData = await productSchema.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Update is successful",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong on the server",
      error: error.message,
    });
  }
}

async function deleteProductController(req, res) {
  try {
    const { id } = req.params;

    const deletedData = await productSchema.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "your product is deleted successfully",
      data: deletedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something is wrong in server",
      error: error,
    });
  }
}

module.exports = {
  createProductController,
  getAllProductController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
};
