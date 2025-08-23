import { useState } from "react";

export default function ProductForm({ onSubmit, initialData }) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [image, setImage] = useState(initialData?.image || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, price, image });
    setName("");
    setPrice("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
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

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />

      <button type="submit" className="btn gold">
        {initialData ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
