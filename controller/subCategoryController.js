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
            $push:{subCategory: data._id}
        },
        {
            new: true
        }
    )
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

module.exports = createSubCategory;
