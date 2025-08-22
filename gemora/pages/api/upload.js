// pages/api/upload.js
import cloudinary from "@/lib/cloudinary";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { file } = req.body; // file should be a base64 string or remote URL
    const result = await cloudinary.uploader.upload(file, {
      folder: "gemora",
    });
    res.status(200).json({ url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
}
