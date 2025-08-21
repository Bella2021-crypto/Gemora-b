// components/ProductCard.js
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={500}
          className="image"
        />
        <div className="overlay">
          <button className="btn gold">View Details</button>
        </div>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span className="price">{product.price}</span>
      </div>
    </div>
  );
}
