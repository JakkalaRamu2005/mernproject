import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useAuth();

  // Fetch cart from backend when user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isLoggedIn]);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/cart", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        // Transform backend data to match frontend format
        const transformedItems = data.cartItems.map(item => ({
          id: item.product_id,
          title: item.title,
          price: item.price,
          image: item.image,
          category: item.category,
          quantity: item.quantity
        }));
        setCartItems(transformedItems);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (product) => {
    if (!isLoggedIn) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          product_id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1
        }),
      });

      if (response.ok) {
        // Refresh cart from backend
        await fetchCart();
      } else {
        const data = await response.json();
        console.error("Error adding to cart:", data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    if (!isLoggedIn) return;

    try {
      const response = await fetch(`http://localhost:5000/cart/remove/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        await fetchCart();
      } else {
        const data = await response.json();
        console.error("Error removing from cart:", data.message);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Update quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (!isLoggedIn) return;

    try {
      const response = await fetch("http://localhost:5000/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          product_id: productId,
          quantity: newQuantity
        }),
      });

      if (response.ok) {
        await fetchCart();
      } else {
        const data = await response.json();
        console.error("Error updating cart:", data.message);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Clear all items from cart
  const clearCart = async () => {
    if (!isLoggedIn) return;

    try {
      const response = await fetch("http://localhost:5000/cart/clear", {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setCartItems([]);
      } else {
        const data = await response.json();
        console.error("Error clearing cart:", data.message);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Get cart count
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * 83 * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartCount,
        getCartTotal,
        clearCart,
        loading,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};