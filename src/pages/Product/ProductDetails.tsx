import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import { addToCart, decreaseQuantity, increaseQuantity } from "../../features/cart/cartSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./product-details.css";

const ProductDetails = () => {
  const { productId = "" } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categoryCards, products } = useAppSelector((state) => state.product);
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.product.id === Number(productId))
  );
  const product = products.find((item) => item.id === Number(productId));
  const category = categoryCards.find((item) => item.id === product?.categoryId);

  if (!product) {
    return (
      <main className="details-page">
        <div className="details-empty">
          <h1>Product not found</h1>
          <Link to="/product">Back to Products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="details-page">
      <section className="details-wrap">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-info">
          <Breadcrumb
            items={[
              { label: "Home", path: "/" },
              { label: "Product", path: "/product" },
              { label: category?.title || "Category", path: `/product/${product.categoryId}` },
              { label: product.name },
            ]}
          />
          <p className="details-brand">{product.brand}</p>
          <h1>{product.name}</h1>
          <p className="details-desc">
            This product data is loaded from the JSON catalog and displayed through Redux state.
            Choose matching products from the list page using price, rating, brand, and color filters.
          </p>

          <div className="details-meta">
            <span>Color: {product.color}</span>
            <span>Rating: {product.rating} star</span>
            <span>Category: {category?.title}</span>
          </div>

          <strong>Rs. {product.price}</strong>
          <div className="details-quantity">
            <button
              aria-label="Decrease quantity"
              onClick={() => dispatch(decreaseQuantity(product.id))}
              disabled={!cartItem}
            >
              -
            </button>
            <span>{cartItem?.quantity || 0}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => {
                if (cartItem) {
                  dispatch(increaseQuantity(product.id));
                } else {
                  dispatch(addToCart(product));
                }
              }}
            >
              +
            </button>
          </div>
          <div className="details-actions">
            <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>
            <button onClick={() => navigate(`/buy-now/${product.id}`)}>Buy Now</button>
          </div>
          <Link to={`/product/${product.categoryId}`} className="details-back">
            Back to related products
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
