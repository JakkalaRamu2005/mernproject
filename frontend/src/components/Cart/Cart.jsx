import "./cart.css"
import {useCart} from "../CartContext"
function Cart() {
  const {cart} = useCart();
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h1 className="cart-heading">Your Shopping Cart</h1>
        <div className="empty-cart">
          <img
            src="https://th.bing.com/th/id/OIP.878mI0HOGJFQl5iF3O_sigHaE7?w=233&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3"
            alt="Empty Cart"
            className="empty-cart-image"
          />
          <h2 className="empty-cart-text">Your cart is empty</h2>
          <p className="empty-cart-subtext">
            Looks like you haven’t added any products yet.
          </p>
          <a href="/products" className="shop-button">Shop Now</a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Your Shopping Cart</h1>
      <div className="cart-items">
        {cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h2 className="cart-item-title">{item.title}</h2>
              <p className="cart-item-price">₹{item.price}</p>
              <p className="cart-item-quantity">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: ₹{totalPrice}</h2>
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
}
export default Cart;