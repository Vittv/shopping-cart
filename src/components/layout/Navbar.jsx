import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./css/Navbar.css";

const Navbar = () => {
  const { totalQuantity } = useCart();

  return (
    <>
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
    </>
  );
};

export default Navbar;
