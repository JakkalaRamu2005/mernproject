import { Link, useNavigate } from "react-router-dom";
import {FaShoppingCart} from 'react-icons/fa'
import { useAuth } from "../AuthContext";
import {useCart} from "../CartContext";

import "./navbar.css";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
 
  const navigate = useNavigate();
  const {getCartCount} = useCart();

  if (!isLoggedIn) return null;

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    navigate("/login");
  };

  const cartCount = getCartCount();

  return (
    <nav>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={24} />
          {cartCount >0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>
      <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
    </nav>
  );
}

export default Navbar;
