const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

async function uploadImg(imgPath) {
  try {
    const result = await cloudinary.uploader.upload(imgPath, {
      folder: "upload",
      resource_type: "auto",
    });
    fs.unlinkSync(imgPath)
    return result;
  } catch (err) {
    console.error("Cloudinary upload failed:", err.message);
    fs.unlinkSync(imgPath)
    throw err;
  }
}

module.exports = uploadImg;
