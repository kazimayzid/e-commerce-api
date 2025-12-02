const mongoose = require("mongoose");
const { Schema } = mongoose;
const checkoutSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please provide firstName"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide lastName"],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Number is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  postCode: {
    type: String,
    required: [true, "PostCode is required"],
    trim: true,
  },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "productList" },
      name: String,
      price: Number,
      qty: Number,
      image: String,
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("checkoutData", checkoutSchema);
