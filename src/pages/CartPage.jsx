import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./css/CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalQuantity } =
    useCart();
  const items = Object.values(cart);

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <p>No items in cart yet.</p>
        <Link to="/shop">Back to shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-items">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="cart-item">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="cart-thumbnail"
            />
            <div className="cart-item-info">
              <p className="cart-item-title">{product.title}</p>
              <p className="cart-item-price">
                ${(product.price * quantity).toFixed(2)}{" "}
                <span className="cart-item-qty">({quantity})</span>
              </p>
            </div>
            <div className="cart-item-controls">
              <button
                type="button"
                onClick={() => updateQuantity(product.id, quantity - 1)}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(product.id, quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="cart-remove"
              onClick={() => removeFromCart(product.id)}
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-sticky-bar">
        <div className="cart-total">
          <span>{totalQuantity} items</span>
          <span className="cart-total-sum">${totalPrice.toFixed(2)}</span>
        </div>
        <button type="button" className="cart-checkout-btn">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
