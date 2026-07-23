import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  try {
    const result = await cloudinary.search
      .expression("folder:NEWS2")
      .sort_by("created_at", "desc")
      .max_results(500)
      .execute();

    const images = result.resources.map((img) => ({
      id: img.asset_id,
      public_id: img.public_id,
      url: img.secure_url,
      width: img.width,
      height: img.height,
      created_at: img.created_at,
    }));

    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}