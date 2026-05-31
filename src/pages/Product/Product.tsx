import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./product.css";

const Product = () => {
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.product.categoryCards);

  return (
    <main className="product-page">
      <section className="product-hero">
        <div className="product-hero-content">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Product" }]} />
          <p className="product-kicker">PRODUCTS</p>
          <h1>Smart tools for modern teams</h1>
          <p className="product-hero-desc">
            Explore secure, responsive, and scalable product solutions built for daily business
            operations.
          </p>
        </div>
      </section>

      <section className="product-section">
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <div className="product-card-content">
                <h2>{product.title}</h2>
                <p>{product.desc}</p>
                <button onClick={() => navigate(`/product/${product.id}`)}>View Details</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Product;
