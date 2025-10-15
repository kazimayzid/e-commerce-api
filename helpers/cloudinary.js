const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

async function uploadImg(imgPath) {
  const result =await cloudinary.uploader.upload(imgPath);
  return result;
}

module.exports = uploadImg;
