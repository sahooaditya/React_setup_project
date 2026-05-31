import { Link, useNavigate } from "react-router-dom";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../../features/cart/cartSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { FiArrowRight, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import "./cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="cart-page">
      <section className="cart-header">
        <div className="cart-header-content">
          <span className="cart-kicker">
            <FiShoppingBag /> Shopping Cart
          </span>
          <h1>Your cart is ready.</h1>
          <p>
            {items.length === 0
              ? "Add your favorite products and they will appear here."
              : `${items.length} products and ${totalItems} items ready for checkout.`}
          </p>
        </div>
      </section>

      {items.length === 0 ? (
        <section className="cart-empty">
          <div className="cart-empty-icon">
            <FiShoppingBag />
          </div>
          <h2>Your cart is empty</h2>
          <p>Browse the latest collection and add products to continue checkout.</p>
          <Link to="/product">
            Browse Products <FiArrowRight />
          </Link>
        </section>
      ) : (
        <section className="cart-layout">
          <div className="cart-list">
            {items.map((item) => (
              <article className="cart-item" key={item.product.id}>
                <div className="cart-image-wrap">
                  <img src={item.product.image} alt={item.product.name} />
                </div>

                <div className="cart-info">
                  <span className="cart-brand">{item.product.brand}</span>
                  <h2>{item.product.name}</h2>
                  <div className="cart-meta">
                    <span>{item.product.color}</span>
                    <span>{item.product.rating} star</span>
                  </div>

                  <div className="cart-bottom">
                    <div className="cart-quantity" aria-label="Quantity controls">
                      <button
                        className="quantity-btn"
                        aria-label="Decrease quantity"
                        onClick={() => dispatch(decreaseQuantity(item.product.id))}
                      >
                        <FiMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        aria-label="Increase quantity"
                        onClick={() => dispatch(increaseQuantity(item.product.id))}
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <strong>Rs. {item.product.price * item.quantity}</strong>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  aria-label={`Remove ${item.product.name}`}
                >
                  <FiTrash2 />
                  <span>Remove</span>
                </button>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <span className="summary-kicker">Secure checkout</span>
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <strong>{totalItems}</strong>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>Rs. {total}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <strong>Free</strong>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>Rs. {total}</strong>
            </div>

            <button onClick={() => navigate("/buy-now")}>
              Buy Now <FiArrowRight />
            </button>
          </aside>
        </section>
      )}
    </main>
  );
};

export default Cart;
