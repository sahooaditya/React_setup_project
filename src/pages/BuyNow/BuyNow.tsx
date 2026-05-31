import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  FiArrowRight,
  FiCreditCard,
  FiPackage,
  FiShield,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import "./buy-now.css";

const loadRazorpayScript = () => {
  return new Promise<boolean>((resolve) => {
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );

    if (existingScript) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const BuyNow = () => {
  const { productId } = useParams();
  const products = useAppSelector((state) => state.product.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.auth.user);
  const directProduct = productId
    ? products.find((product) => product.id === Number(productId))
    : null;
  const items = directProduct ? [{ product: directProduct, quantity: 1 }] : cartItems;
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const apiBaseUrl = process.env.REACT_APP_PAYMENT_API_URL || "http://localhost:5000";

  const getRazorpayConfig = async () => {
    const response = await fetch(`${apiBaseUrl}/api/razorpay/config`);
    const data = await response.json();

    if (!response.ok || !data.keyId) {
      throw new Error(data.message || "Unable to load Razorpay key.");
    }

    return data as { keyId: string };
  };

  const createRazorpayOrder = async () => {
    const response = await fetch(`${apiBaseUrl}/api/razorpay/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total * 100,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to create Razorpay order.");
    }

    return data;
  };

  const verifyRazorpayPayment = async (paymentResponse: unknown) => {
    const response = await fetch(`${apiBaseUrl}/api/razorpay/verify-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentResponse),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Payment verification failed.");
    }

    return data;
  };

  const handlePayment = async () => {
    try {
      const isLoaded = await loadRazorpayScript();
      const config = await getRazorpayConfig();

      if (!isLoaded) {
        alert("Razorpay SDK failed to load. Please check your internet connection.");
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay checkout is not available. Please refresh and try again.");
        return;
      }

      const order = await createRazorpayOrder();

      const options = {
        key: config.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "MyCompany",
        description: items.map((item) => item.product.name).join(", "),
        order_id: order.id,
        handler: async (response: unknown) => {
          try {
            await verifyRazorpayPayment(response);
            alert("Payment successful and verified.");
          } catch (error) {
            alert(error instanceof Error ? error.message : "Payment verification failed.");
          }
        },
        prefill: {
          name: user?.username || "Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          products: items.map((item) => `${item.product.name} x ${item.quantity}`).join(", "),
        },
        theme: {
          color: "#7c3aed",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", (response) => {
        console.log("Razorpay payment failed", response);
        const failure = response as {
          error?: {
            description?: string;
            reason?: string;
            source?: string;
            step?: string;
          };
        };
        const message =
          failure.error?.description ||
          failure.error?.reason ||
          "Payment failed. Use UPI success@razorpay or choose Success on the mock bank page.";

        alert(message);
      });
      paymentObject.open();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to start Razorpay payment.");
    }
  };

  return (
    <main className="buy-page">
      <section className="buy-header">
        <div className="buy-header-content">
          <span className="buy-kicker">
            <FiCreditCard /> Secure Checkout
          </span>
          <h1>Review and place your order.</h1>
          <p>
            Confirm your products, check the total, and continue to a secure Razorpay payment.
          </p>
        </div>
      </section>

      {items.length === 0 ? (
        <section className="buy-empty">
          <div className="buy-empty-icon">
            <FiShoppingBag />
          </div>
          <h2>No products selected</h2>
          <p>Add products to your cart or choose Buy Now from a product page.</p>
          <Link to="/product">
            Browse Products <FiArrowRight />
          </Link>
        </section>
      ) : (
        <section className="buy-layout">
          <div className="buy-products">
            <div className="checkout-steps">
              <div>
                <FiPackage />
                <span>Review</span>
              </div>
              <div>
                <FiTruck />
                <span>Free delivery</span>
              </div>
              <div>
                <FiShield />
                <span>Secure payment</span>
              </div>
            </div>

            {items.map((item) => (
              <article className="buy-item" key={item.product.id}>
                <div className="buy-image-wrap">
                  <img src={item.product.image} alt={item.product.name} />
                </div>

                <div className="buy-info">
                  <span className="buy-brand">{item.product.brand}</span>
                  <h2>{item.product.name}</h2>

                  <div className="buy-meta">
                    <span>{item.product.color}</span>
                    <span>Qty {item.quantity}</span>
                  </div>

                  <div className="buy-price-row">
                    <span>Item total</span>
                    <strong>Rs. {item.product.price * item.quantity}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="buy-summary">
            <span className="summary-kicker">Payment Summary</span>
            <h2>Payment Summary</h2>

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

            <button onClick={handlePayment}>
              Place Order <FiArrowRight />
            </button>

            <p className="payment-note">
              <FiShield /> Payments are processed through Razorpay checkout.
            </p>
          </aside>
        </section>
      )}
    </main>
  );
};

export default BuyNow;
