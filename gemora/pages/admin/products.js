import { useEffect, useState } from "react";
import Image from "next/image";
import ProductForm from "../../components/ProductForm";
import { optimizeImage } from "../../lib/cloudinaryHelpers";
import styles from "../../styles/productGrid.module.scss"; // ✅ new grid styles

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  // Fetch products
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Add product
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

      <div className={styles.productList}>
        {products.map((p) => (
          <div key={p._id} className={styles.card}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "250px",
              }}
            >
              <Image
                src={optimizeImage(p.image, { width: 400, height: 400 })}
                alt={p.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3>{p.name}</h3>
            <p className="price">${p.price}</p>
            <div className="actions">
              <button className="btn small" onClick={() => setEditing(p)}>
                Edit
              </button>
              <button
                className="btn danger small"
                onClick={() => deleteProduct(p._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
