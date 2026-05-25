import { Link } from "react-router-dom";
import "./css/Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="home">
          <Link to="/">~</Link>
        </div>
        <div className="right-links">
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
