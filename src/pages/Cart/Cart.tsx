import { Link, useNavigate } from "react-router-dom";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../../features/cart/cartSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <main className="cart-page">
      <section className="cart-header">
        <h1>Cart</h1>
        <p>{items.length} products ready for checkout</p>
      </section>

      {items.length === 0 ? (
        <section className="cart-empty">
          <h2>Your cart is empty</h2>
          <Link to="/product">Browse Products</Link>
        </section>
      ) : (
        <section className="cart-layout">
          <div className="cart-list">
            {items.map((item) => (
              <article className="cart-item" key={item.product.id}>
                <img src={item.product.image} alt={item.product.name} />
                <div>
                  <span>{item.product.brand}</span>
                  <h2>{item.product.name}</h2>
                  <p>
                    {item.product.color} | {item.product.rating} star
                  </p>
                  <div className="cart-quantity">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => dispatch(decreaseQuantity(item.product.id))}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => dispatch(increaseQuantity(item.product.id))}
                    >
                      +
                    </button>
                  </div>
                  <strong>Rs. {item.product.price * item.quantity}</strong>
                </div>
                <button onClick={() => dispatch(removeFromCart(item.product.id))}>Remove</button>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <p>Total</p>
            <strong>Rs. {total}</strong>
            <button onClick={() => navigate("/buy-now")}>Buy Now</button>
          </aside>
        </section>
      )}
    </main>
  );
};

export default Cart;
