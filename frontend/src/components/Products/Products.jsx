// src/pages/Products.js
import React, { useEffect, useState } from "react";
import "./products-enhanced.css";
import { useNavigate } from "react-router";
import { useCart } from "../CartContext";

function Products() {
  // State management
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 8; // Number of products to show per page
  
  const navigate = useNavigate();
  const { addToCart, updateQuantity, getItemQuantity } = useCart();

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

  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Handle product card click (navigate to product details)
  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  // Handle add to cart
  const handleAddToCart = (e, product) => {
    e.stopPropagation(); 
    addToCart(product);
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (e, productId) => {
    e.stopPropagation();
    const currentQuantity = getItemQuantity(productId);
    updateQuantity(productId, currentQuantity + 1);
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (e, productId) => {
    e.stopPropagation();
    const currentQuantity = getItemQuantity(productId);
    updateQuantity(productId, currentQuantity - 1);
  };

  // Pagination handlers
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  // Render cart button or quantity selector
  const renderCartButton = (product) => {
    const quantity = getItemQuantity(product.id);
    
    if (quantity === 0) {
      return (
        <button 
          className="product-button add-to-cart-btn" 
          onClick={(e) => handleAddToCart(e, product)}
        >
          Add to Cart
        </button>
      );
    } else {
      return (
        <div className="quantity-selector" onClick={(e) => e.stopPropagation()}>
          <button 
            className="quantity-btn decrease-btn"
            onClick={(e) => handleDecreaseQuantity(e, product.id)}
          >
            -
          </button>
          <span className="quantity-display">{quantity}</span>
          <button 
            className="quantity-btn increase-btn"
            onClick={(e) => handleIncreaseQuantity(e, product.id)}
          >
            +
          </button>
        </div>
      );
    }
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
      
      {/* Products Grid */}
      <div className="products-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-wrapper">
            <div 
              className="product-card"
              onClick={() => handleCardClick(product.id)}
            >
              <img 
                src={product.image} 
                alt={product.title} 
                className="product-image" 
              />
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">₹{(product.price * 83).toFixed(2)}</p>
            </div>
            {renderCartButton(product)}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button 
            className={`pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={goToPrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="page-numbers">
            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
                onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          
          <button 
            className={`pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={goToNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      
      {/* Page Info */}
      <div className="page-info">
        Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
      </div>
    </div>
  );
}

export default Products;
