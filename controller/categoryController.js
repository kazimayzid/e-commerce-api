const categorySchema = require("../model/categorySchema");

async function createCategoryController(req, res) {
  const { name, description } = req.body;

  const existingCategory = await categorySchema.findOne({ name });

  if (!name) {
    return res.status(400).json({
      success: false,
      messege: "plz give a category Name",
    });
  }

  if (existingCategory.name === name) {
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
}
module.exports = createCategoryController;
