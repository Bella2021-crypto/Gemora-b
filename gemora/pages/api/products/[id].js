import dbConnect from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ error: "Not found" });
        res.status(200).json(product);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch product" });
      }
      break;

    case "PUT":
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json(product);
      } catch (err) {
        res.status(400).json({ error: "Failed to update product" });
      }
      break;

    case "DELETE":
      try {
        await Product.findByIdAndDelete(id);
        res.status(204).end();
      } catch (err) {
        res.status(400).json({ error: "Failed to delete product" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
