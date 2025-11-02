const categorySchema = require("../model/categorySchema");
const subCatagorySchema = require("../model/subCatagorySchema");

async function createSubCategory(req, res) {
  try {
    const { name, description, category } = req.body;

    const existSubCategory = await subCatagorySchema.findOne({ name });

    if (existSubCategory) {
      return res.status(201).json({
        success: false,
        message: "this Subcategory alreday exist",
      });
    }

    const data = await new subCatagorySchema({
      name,
      description,
      category,
    });
    await data.save();

    await categorySchema.findByIdAndUpdate(
      category,
      {
        $push: { subCategory: data._id },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Subcategory created successfully",
      data: data,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "something is wrong in server",
      error: error,
    });
  }
}

async function getAllSubCategory(req, res) {
  try {
    const allSubCategory = await subCatagorySchema.find().populate("category").populate("category", "name description -_id");

    return res.status(200).json({
      success: true,
      message: "Data of all Subcategory",
      data: allSubCategory,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "something is wrong in server",
      error: error,
    });
  }
}

async function getSingleSubCategoryController(req, res) {
  try {
    const { id } = req.params;
    const singleSubCategoryData = await subCatagorySchema.findById(id);

    if (!singleSubCategoryData) {
      return res.status(400).json({
        success: false,
        message: "This subCategory is not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "subCategory Data",
      data: singleSubCategoryData,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "something is wrong in server",
      error: error,
    });
  }
}

async function updateSubCategoryController(req, res) {
  try {
    const { id } = req.params;
    const { name, description, category } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "plz give a name",
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "plz give a description",
      });
    }

    const updatedData = await subCatagorySchema.findByIdAndUpdate(
      id,
      {
        $set: { name, description, category },
      },
      {
        new: true,
      }
    );

    let updatedCategory = null;
    if (category) {
      await categorySchema.updateMany(
        { subCategory: id },
        { $pull: { subCategory: id } }
      );

      updatedCategory = await categorySchema.findByIdAndUpdate(
        category,
        {
          $addToSet: { subCategory: updatedData._id },
        },
        {
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: category
        ? "Subcategory and category updated successfully."
        : "Subcategory updated successfully.",
      data: {
        subCategory: updatedData,
        category: updatedCategory,
      },
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "something is wrong in server",
      error: error.message,
    });
  }
}

async function deleteSubCategoryController(req, res) {
  try {
    const { id } = req.params;
    const deleteData = await subCatagorySchema.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "subcategory is deleted successfully",
      data: deleteData,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "something is wrong in server",
      error: error,
    });
  }
}

module.exports = {
  createSubCategory,
  getAllSubCategory,
  getSingleSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryController,
};
