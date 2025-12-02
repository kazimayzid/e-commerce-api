const checkoutSchema = require("../model/checkoutSchema");

async function createCheckOutController(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postCode,
      totalAmount,
      products,
    } = req.body;

    if (!firstName || !lastName || !phone || !address || !city || !postCode) {
      return res.status(400).json({
        success: false,
        message:
          "FistName, LastName, Phone, Address, City, PostCode are required",
      });
    }
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Products are required for checkout",
      });
    }
    if (!totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Total amount is required",
      });
    }
    const checkoutData = await checkoutSchema.create({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postCode,
      products,
      totalAmount
    });



    res.status(201).json({
      success: true,
      message: "Checkout data is saved in DB successfully",
      data: checkoutData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something is wrong in server",
      error: error.message,
    });
  }
}

module.exports = { createCheckOutController };
