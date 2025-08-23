import { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  // Fetch all products
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Add new product
  const addProduct = async (product) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const newProduct = await res.json();
    setProducts([...products, newProduct]);
  };

  // Update product
  const updateProduct = async (id, product) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const updated = await res.json();
    setProducts(products.map((p) => (p._id === id ? updated : p)));
    setEditing(null);
  };

  // Delete product
  const deleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="admin-content">
      <h2>Manage Products</h2>

      {editing ? (
        <ProductForm
          initialData={editing}
          onSubmit={(data) => updateProduct(editing._id, data)}
        />
      ) : (
        <ProductForm onSubmit={addProduct} />
      )}

      <div className="product-list">
        {products.map((p) => (
          <div key={p._id} className="card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">${p.price}</p>

            <div className="actions">
              <button className="btn small" onClick={() => setEditing(p)}>
                Edit
              </button>
              <button className="btn danger small" onClick={() => deleteProduct(p._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
