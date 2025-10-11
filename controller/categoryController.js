const categorySchema = require("../model/categorySchema");

async function createCategoryController(req, res) {
  try {
    const { name, description } = req.body;
    console.log(name, description);

    const existingCategory = await categorySchema.findOne({ name });

    if (!name) {
      return res.status(400).json({
        success: false,
        messege: "plz give a category Name",
      });
    }

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        messege: "This category name alreday exist",
      });
    }

    const category = new categorySchema({
      name,
      description,
    });
    category.save();

    return res.status(200).json({
      success: true,
      messege: "Category Created",
      data: category,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      messege: "something is wrong in server",
      error: error,
    });
  }
}

async function getCategoryController(req, res) {
  try {
    const categoryData = await categorySchema.findOne();

    return res.status(200).json({
      success: false,
      messege: "these are category datas",
      data: categoryData,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      messege: "something is wrong in server",
      error: error,
    });
  }
}

async function getsinglecategory(req, res) {
  try {
    const { id } = req.params;
    const getsinglecategoryData = await categorySchema.findById(id);

    if (!getsinglecategoryData) {
      return res.status(400).json({
        success: false,
        messege: "there is no data like that",
      });
    }

    return res.status(200).json({
      success: true,
      messege: "this is your searching data",
      data: getsinglecategoryData,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      messege: "something is wrong in server",
      error: error,
    });
  }
}

async function updateCategoryController(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatecategory = await categorySchema.findByIdAndUpdate(
      id,
      {
        $set: { name: name, description: description },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      messege: "category updated successfull",
      data: updatecategory,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      messege: "something is wrong in server",
      error: error,
    });
  }
}

async function deleteCategoryController(req, res) {
  try {
    const { id } = req.params;
    const deleteCategory = await categorySchema.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      messege: "this category is deleted successfully",
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      messege: "something is wrong in server",
      error: error,
    });
  }
}
module.exports = {
  createCategoryController,
  getCategoryController,
  getsinglecategory,
  updateCategoryController,
  deleteCategoryController,
};
