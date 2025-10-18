// src/pages/Products.js
import React, { useEffect, useState } from "react";
import "./products.css";
import { useNavigate } from "react-router";
// import { useCart } from "../CartContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  

  // Fetch products from API
  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

 

  if (loading) {
    return (
      <div className="products-container">
        <div className="loading-spinner">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1 className="products-heading">Products Page</h1>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => handleCardClick(product.id)}>
            <img 
              src={product.image} 
              alt={product.title} 
              className="product-image" 
            />
            <h2 className="product-title">{product.title}</h2>
            <p className="product-price">₹{(product.price * 83).toFixed(2)}</p>
            <button 
              className="product-button" 
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
