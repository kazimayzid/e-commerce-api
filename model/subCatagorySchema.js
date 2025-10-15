const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "productList",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "catagoriesList",
    required: true,
  },
});

module.exports = mongoose.model("subCatagoriesList", subCategorySchema);
