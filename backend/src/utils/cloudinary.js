const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dcm21aeqp",
  api_key: "312961894816823",
  api_secret: "c1kEerzo3b-huE6HqeyN8iO8QVY",
});

const handleUpload = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

const handleDestroy = async (publicId) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { handleDestroy, handleUpload };
