import { Link, useNavigate } from "react-router";
import {FaShoppingCart, FaMoon, FaSun} from 'react-icons/fa'
import { useAuth } from "../AuthContext";
import {useCart} from "../CartContext"
import { useTheme } from "../ThemeContext";
import "./navbar.css";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { getTotalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  if (!isLoggedIn) return null;

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={24} />
          {getTotalItems() > 0 && <span className="cart-count">{getTotalItems()}</span>}
        </Link>
        <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
          {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
