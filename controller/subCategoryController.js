const categorySchema = require("../model/categorySchema");
const subCatagorySchema = require("../model/subCatagorySchema");

async function createSubCategory(req, res) {
  try {
    const { name, description, category } = req.body;

    const existSubCategory = await subCatagorySchema.findOne({ name });

    if (existSubCategory) {
      return res.status(201).json({
        success: false,
        messege: "this Subcategory alreday exist",
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
      messege: "Subcategory created successfully",
      data: data,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      messege: "something is wrong in server",
      error: error,
    });
  }
}

async function getAllSubCategory(req, res) {
  try {
    const allSubCategory = await subCatagorySchema.find();

    return res.status(200).json({
      success: true,
      messege: "Data of all Subcategory",
      data: allSubCategory,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      messege: "something is wrong in server",
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
        messege: "This subCategory is not exist",
      });
    }

    res.status(200).json({
      success: true,
      messege: "subCategory Data",
      data: singleSubCategoryData,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      messege: "something is wrong in server",
      error: error,
    });
  }
}

async function updateSubCategoryController(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        messege: "plz give a name"
      })
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        messege: "plz give a description"
      })
    }

    const updatedData = await subCatagorySchema.findByIdAndUpdate(
      id,
      {
        $set:{name, description}
      },
      {
        new: true
      }
    )


    res.status(200).json({
      success: true,
      messege: "your subCategory is updated successfully",
      data: updatedData
    })
  } catch (error) {
    return res.status(501).json({
      success: false,
      messege: "something is wrong in server",
      error: error,
    });
  }
}

async function deleteSubCategoryController(req, res) {
 try {
   const {id} = req.params;
  const deleteData = await subCatagorySchema.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    messege: "subcategory is deleted successfully",
    data: deleteData
  })
 } catch (error) {
   return res.status(501).json({
      success: false,
      messege: "something is wrong in server",
      error: error,
    });
 }
}

module.exports = {
  createSubCategory,
  getAllSubCategory,
  getSingleSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryController
};
