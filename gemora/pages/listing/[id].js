import { products } from "../../lib/data";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

export default function ListingPage() {
  const router = useRouter();
  const { id } = router.query;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <Layout><p>Product not found.</p></Layout>;

  return (
    <Layout title={product.name}>
      <div className="product-detail">
        <h1>{product.name}</h1>
        <p>Price: ${product.price.toLocaleString()}</p>
        <p>
          {product.stock > 0 ? (
            <span>In stock: {product.stock}</span>
          ) : (
            <span style={{ color: "red" }}>Sold Out</span>
          )}
        </p>

        {product.stock > 0 ? (
          <button className="btn">Add to Cart</button>
        ) : (
          <button className="btn soldout" disabled>Sold Out</button>
        )}
      </div>
    </Layout>
  );
}
