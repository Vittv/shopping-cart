import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./css/Navbar.css";

const Navbar = () => {
  const { totalQuantity } = useCart();

  return (
    <>
      <div className="navbar">
        <div className="home">
          <Link to="/">~</Link>
        </div>
        <div className="right-links">
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart {totalQuantity}</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
