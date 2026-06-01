import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./css/Navbar.css";

const Navbar = () => {
  const { totalQuantity } = useCart();

  const ref = useRef(null);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${ref.current.offsetHeight}px`,
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="navbar">
      <div className="home">
        <Link to="/">
          VITT<span className="mart">MART</span>
        </Link>
      </div>
      <div className="right-links">
        <Link className="shop-link" to="/shop">
          Shop
        </Link>
        <Link className="cart-link" to="/cart">
          <FontAwesomeIcon icon={faCartArrowDown} />
          <span className="cart-qty">
            {totalQuantity > 99 ? "99+" : totalQuantity}{" "}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
