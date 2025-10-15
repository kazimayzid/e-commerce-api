const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema ({
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      required: [true, "Please provide product description"],
    },

    price: {
      type: Number,
      required: [true, "Please provide product price"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },

    image: {
      type: String
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    
    discount: {
      type: Number,
    },
    sold: {
        type: Number
    },
    subCategory: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "subCatagoriesList"
    }
  },
)

module.exports = mongoose.model("productList", productSchema)
