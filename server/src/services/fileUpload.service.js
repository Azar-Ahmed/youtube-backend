import cloudinary from "../config/cloudinary.config.js";

export const uploadImage = async (file) => {
  try {
    if (!file.tempFilePath) {
      throw new Error(
        "Temp file path missing. Check if express-fileupload is configured with useTempFiles: true"
      );d
    }

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "youtube_clone",
    });
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

export const uploadVideo = async (file) => {
  try {
    if (!file.tempFilePath) {
      throw new Error(
        "Temp file path missing. Check if express-fileupload is configured with useTempFiles: true"
      );
    }

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "video",
      folder: "youtube_clone/videos",
    });

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  } catch (error) {
    throw new Error("Cloudinary video upload failed: " + error.message);
  }
};