import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import { useAuth } from "../AuthContext";
import { useCart } from "../CartContext";
import "./navbar.css";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();

  if (!isLoggedIn) return null;

  const handleLogout = async () => {
    try {
      await fetch("https://emmorce-2qehvpxa8-ramus-projects-a74e5d04.vercel.app/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const cartCount = getCartCount();

  // Check if current route is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Brand/Logo */}
        <Link to="/" className="nav-brand">
          <span className="brand-icon">🛒</span>
          <span className="brand-text">ShopEase</span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/products" 
            className={`nav-link ${isActive('/products') ? 'active' : ''}`}
          >
            Products
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="nav-actions">
          {/* Cart Icon with Badge */}
          <Link to="/cart" className="cart-link">
            <div className="cart-icon-wrapper">
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>
            <span className="cart-text">Cart</span>
          </Link>

          {/* Logout Button */}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
