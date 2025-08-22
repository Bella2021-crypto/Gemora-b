import { useState } from "react";

export default function ProductForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Convert file → base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // Handle file input
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));

    const base64 = await toBase64(file);

    // Upload to API
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: base64 }),
    });

    const data = await res.json();
    setImage(data.url); // Save Cloudinary URL
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, price, image });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="preview" width="120" />}
      <button type="submit" className="btn gold">Save Product</button>
    </form>
  );
}
