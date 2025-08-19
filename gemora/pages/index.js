
import Layout from "../components/Layout";
import { products } from "../lib/data";
export default function Home(){
  return (<Layout title="Home">
    <section><h2 style={{fontFamily:'Playfair Display, serif',letterSpacing:'1px'}}>Discover Timeless Luxury</h2>
    <p style={{color:'#ccc'}}>Curated pieces crafted for the few who value the finest.</p></section>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'1rem',marginTop:'1.25rem'}}>
      {products.map(p=>(<div className="card" key={p.id}>
        <div style={{overflow:'hidden',borderRadius:12}}>
          <img src={p.image} alt={p.name} style={{width:'100%',height:200,objectFit:'cover',transition:'transform .3s'}} onMouseOver={e=>e.currentTarget.style.transform='scale(1.04)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'} />
        </div>
        <div className="mt-3"><div className="card-title">{p.name}</div><div className="price">${p.price.toLocaleString()}</div></div>
        <a className="btn mt-3" href={`/listing/${p.id}`}>View Details</a>
      </div>))}
    </div>
  </Layout>);
}
import { useCurrency } from "../context/CurrencyContext";

export default function Home({ products }) {
  const { convertPrice, currency } = useCurrency();

  return (
    <div>
      {products.map((p) => (
        <div key={p.id}>
          <h2>{p.name}</h2>
          <p>{currency} {convertPrice(p.price)}</p>
        </div>
      ))}
    </div>
  );
}
