const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
  },
  subCategory: [
    {
      type: Schema.Types.ObjectId,
      ref: "subCatagoriesList",
    },
  ],
});

module.exports = mongoose.model("catagoriesList", categorySchema);
