import cloudinary from "../../lib/cloudinary";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const fileStr = req.body.data; // base64 encoded image
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        folder: "gemora/products", // optional: keep uploads organized
      });
      res.json({ url: uploadResponse.secure_url });
    } catch (err) {
      res.status(500).json({ error: "Upload failed", details: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
