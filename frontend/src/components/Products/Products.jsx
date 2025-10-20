// src/pages/Products.js
import React, { useEffect, useState } from "react";
import "./products.css";
import { useNavigate } from "react-router";
import { useCart } from "../CartContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [productsPerpage] = useState(8);
  const navigate = useNavigate();
  const { addToCart } = useCart();


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

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);

  }


  if (loading) {
    return (
      <div className="products-container">
        <div className="loading-spinner">Loading products...</div>
      </div>
    );
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }

  const clearsearch = () => {
    setSearchQuery("");
    setCurrentPage(1);

  }
  const filteredProducts = products.filter((product) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      product.title.toLowerCase().includes(searchLower) || product.category.toLowerCase().includes(searchLower)
    );
  });

  const totalFilteredPages = Math.ceil(filteredProducts.length / productsPerpage);
  const indexOfLastFilteredProduct = currentPage * productsPerpage;
  const indexOfFirstFilteredProduct = indexOfLastFilteredProduct - productsPerpage;
  const currentFilteredProducts = filteredProducts.slice(indexOfFirstFilteredProduct, indexOfLastFilteredProduct);

  return (
    <div className="products-container">
      <h1 className="products-heading">Products Page</h1>
      <div className="search-container">
        <input type="text" placeholder="Search products by name or category..."

          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        {searchQuery && (
          <button onClick={clearsearch} className="clear-search-btn">Clear</button>
        )}

      </div>
      {searchQuery && (
        <p className="search-results-info">
          Found {filteredProducts.length} product(s) for "{searchQuery}"
        </p>
      )}
      <div className="products-grid">

        {currentFilteredProducts.length > 0 ? (
          currentFilteredProducts.map((product) => (
            <div key={product.id} className="product-card" onClick={() => handleCardClick(product.id)}>
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">₹{(product.price * 83).toFixed(2)}</p>
              <button
                className="product-button" onClick={(e) => handleAddToCart(e, product)}
              >
                Add to Cart
              </button>
            </div>

          ))
        ) : (
          <div className="no-products">
            <p>No products found matching "{searchQuery}"</p>
            <button onClick={clearsearch} className="clear-search-btn">Clear Search</button>
          </div>
        )}
      </div>


      {filteredProducts.length > 0 && (
        <>
          <div className="pagination-container">
            <button onClick={prevPage} disabled={currentPage === 1} className="pagination-btn">Previous</button>
            <div className="page-numbers">
              {[...Array(totalFilteredPages)].map((_, index) => (
                <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "page-btn-active" : "page-btn"}>{index + 1}</button>
              ))}
            </div>
            <button onClick={nextPage} disabled={currentPage === totalFilteredPages} className="pagination-btn">Next</button>
          </div>

          <div className="page-info">
            Page {currentPage} of {totalFilteredPages}
          </div>

        </>
      )}

    </div>
  );
}

export default Products;
