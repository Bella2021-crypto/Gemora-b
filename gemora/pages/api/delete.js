// pages/api/delete.js
import cloudinary from "@/lib/cloudinary";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { public_id } = req.body;
    const result = await cloudinary.uploader.destroy(public_id);
    res.status(200).json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
}
