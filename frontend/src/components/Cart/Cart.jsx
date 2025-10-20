import { useCart } from "../CartContext";
import { useState } from "react";
import "./cart.css";


function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal,clearCart } = useCart();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        <p>Your cart is empty. Start shopping!</p>
      </div>
    );
  }

  const handleClearCart=()=>{
    setShowConfirmModal(true);
  }

  const confirmClearCart =()=>{
    clearCart();
    setShowConfirmModal(false);
  }

  const cancelClearCart =()=>{
    setShowConfirmModal(false);
  }

  return (
    <>
  <div className="cart-header">
    <h1>Your Cart</h1>
    {cartItems.length>0&&(
      <button className="clear-all-btn" onClick={handleClearCart}>
        Clear All Items
      </button>
    )}
  </div>


  {showConfirmModal && (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Clear Cart?</h2>
        <p>Are you sure you want to remove all item from your cart?</p>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={confirmClearCart}>
            Yes, Clear All
          </button>
          <button className="cancel-btn" onClick={cancelClearCart}>Cancel</button>
        </div>
      </div>
    </div>
  )}
     <div className="cart-container">
      <h1>Your Cart</h1>
      
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>Price: ₹{(item.price * 83).toFixed(2)}</p>
              
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
              
              <p>Subtotal: ₹{(item.price * 83 * item.quantity).toFixed(2)}</p>
            </div>
            
            <button 
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <h2>Total: ₹{getCartTotal().toFixed(2)}</h2>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
    </>
  );
}

export default Cart;