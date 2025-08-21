// pages/admin/index.js
import styles from "../../styles/admin.module.scss";

export default function AdminPage() {
  return (
    <div className={styles["admin-wrapper"]}>
      {/* Sidebar */}
      <aside className={styles["admin-sidebar"]}>
        <div className={styles["brand"]}>✨ Gemora Admin</div>
        <nav>
          <a href="/admin/products">Products</a>
          <a href="/admin/orders">Orders</a>
          <a href="/admin/settings">Settings</a>
        </nav>
      </aside>

      {/* Content */}
     <main className={styles["admin-content"]}>
     <h2>Dashboard</h2>

  {/* Add Product Button */}
  <button className={`${styles["admin-btn"]} ${styles["add-btn"]}`}>
    + Add New Product
  </button>

  {/* Example Table */}
  <table className={styles.table}>
    <thead>
      <tr>
        <th>ID</th>
        <th>Product</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>001</td>
        <td>Luxury Ring</td>
        <td>$1,200</td>
        <td>12</td>
        <td>
          <button className={styles["admin-btn"]}>Edit</button>
          <button className={`${styles["admin-btn"]} ${styles["delete-btn"]}`}>
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    </main>
    </div>
  );
}


