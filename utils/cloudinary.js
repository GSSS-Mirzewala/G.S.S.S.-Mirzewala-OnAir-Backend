// External Modules
import cloudinary from "../config/connectCloudinary.js";

export const UploadBufferToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "Avatars",
          transformation: [
            {
              width: 300,
              height: 300,
              crop: "fill",
              gravity: "face",
            },
          ],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      )
      .end(buffer);
  });
};

export const DeleteFromCloudinary = async (publicId) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new Error("Failed to delete old image");
  }
};
