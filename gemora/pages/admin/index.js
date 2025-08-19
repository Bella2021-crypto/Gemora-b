import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { products as seed } from "../../lib/data";
import "../../styles/admin.scss";

export default function AdminHome() {
  const [products, setProducts] = useState(seed);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ok = localStorage.getItem("gemora_admin") === "ok";
      if (!ok) window.location.href = "/admin-login";
    }
  }, []);

  // ✅ DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const res = await fetch("/api/products/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      alert("Product deleted!");
      setProducts(products.filter((p) => p.id !== id));
    } else {
      alert("Error deleting product.");
    }
  };

  // ✅ REDUCE STOCK
  const handleReduce = async (id) => {
    const res = await fetch("/api/products/reduce", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      const updated = await res.json();
      setProducts(products.map((p) => (p.id === id ? updated : p)));
    }
  };

  // ✅ RESTOCK
  const handleRestock = async (id) => {
    const res = await fetch("/api/products/restock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, amount: 1 }),
    });
    if (res.ok) {
      const updated = await res.json();
      setProducts(products.map((p) => (p.id === id ? updated : p)));
    }
  };

  // ✅ TOGGLE SOLD OUT
  const handleToggleSoldOut = async (id, soldOut) => {
    const res = await fetch("/api/products/toggle-soldout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, soldOut }),
    });
    if (res.ok) {
      const updated = await res.json();
      setProducts(products.map((p) => (p.id === id ? updated : p)));
    }
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="admin-wrapper">
        <aside className="admin-sidebar">
          <div className="brand logo-shimmer">
            <img src="/gemora-logo.svg" alt="Gemora" style={{ height: 24 }} />
            <span>Admin</span>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <a className="btn" href="/admin">Products</a>
          </div>
        </aside>

        <section className="admin-content">
          <h2 style={{ fontFamily: "Playfair Display, serif" }}>Products</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>${p.price.toLocaleString()}</td>
                  <td>{p.stock}</td>
                  <td>{p.soldOut ? "❌ Sold Out" : "✅ Available"}</td>
                  <td>
                    <button className="btn" onClick={() => handleReduce(p.id)}>
                      ➖ Reduce
                    </button>
                    <button className="btn" onClick={() => handleRestock(p.id)}>
                      ➕ Restock
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleToggleSoldOut(p.id, !p.soldOut)}
                    >
                      {p.soldOut ? "Mark Available" : "Mark Sold Out"}
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                      ✖ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </Layout>
  );
}
