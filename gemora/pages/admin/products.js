import { useState } from "react";
import ProductForm from "@/components/ProductForm";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
    console.log("New product:", product);
    // Here you could POST to your DB API
  };

  return (
    <div className="admin-content">
      <h2>Manage Products</h2>
      <ProductForm onSubmit={addProduct} />

      <div className="product-list">
        {products.map((p, i) => (
          <div key={i} className="card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
