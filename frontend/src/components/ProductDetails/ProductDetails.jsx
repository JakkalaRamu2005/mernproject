import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import "./productdetails.css";
import { useCart } from "../CartContext";

function ProductDetails() {
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    
  };

  if (!product) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  return (
    <div className="details-container">
      <div className="details-image-container">
        <img src={product.image} alt={product.title} className="details-image" />
      </div>
      <div className="details-content">
        <h1 className="details-title">{product.title}</h1>
        <p className="details-category"><strong>Category:</strong> {product.category}</p>
        <p className="details-price">₹{(product.price * 83).toFixed(2)}</p>
        <p className="details-description">{product.description}</p>
        <button onClick={handleAddToCart} className="details-add-to-cart-btn">
          Add to Cart
        </button>
        <Link to="/products" className="details-back-button">Back to Products</Link>
      </div>
    </div>
  );
}

export default ProductDetails;
