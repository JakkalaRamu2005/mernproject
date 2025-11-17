import React, { useEffect, useState } from "react";
import "./products.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [productsPerpage] = useState(8);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
        const prices = data.map(product => product.price * 83);
        const minPrice = Math.floor(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));
        setPriceRange({ min: minPrice, max: maxPrice });
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
  };

  const getFilteredProducts = () => {
    let filtered = products;

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        );
      });
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => {
      const priceINR = product.price * 83;
      return priceINR >= priceRange.min && priceINR <= priceRange.max;
    });

    return filtered;
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");

    if (products.length > 0) {
      const prices = products.map(product => product.price * 83);
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));
      setPriceRange({ min: minPrice, max: maxPrice });
    }
    setCurrentPage(1);
  };

  const filteredProducts = getFilteredProducts();
  const totalFilteredPages = Math.ceil(filteredProducts.length / productsPerpage);
  const indexOfLastFilteredProduct = currentPage * productsPerpage;
  const indexOfFirstFilteredProduct = indexOfLastFilteredProduct - productsPerpage;
  const currentFilteredProducts = filteredProducts.slice(indexOfFirstFilteredProduct, indexOfLastFilteredProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalFilteredPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: parseInt(value) }));
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="products-page">
      {/* Page Header */}
      <div className="products-header">
        <h1 className="products-heading">All Products</h1>
        
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="clear-search-btn">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Content: Sidebar + Products */}
      <div className="products-main-layout">
        {/* Left Sidebar - Filters */}
        <aside className="filters-sidebar">
          <div className="sidebar-header">
            <h2>Filters</h2>
            {(searchQuery || selectedCategory !== "all") && (
              <button onClick={clearAllFilters} className="clear-all-btn">
                Clear All
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCategory !== "all") && (
            <div className="active-filters-section">
              <h3>Active Filters:</h3>
              <div className="active-filters-tags">
                {searchQuery && (
                  <span className="filter-tag">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery("")}>✕</button>
                  </span>
                )}
                {selectedCategory !== "all" && (
                  <span className="filter-tag">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("all")}>✕</button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="filter-section">
            <h3 className="filter-title">Category</h3>
            <div className="filter-options">
              <label className={`filter-option ${selectedCategory === "all" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === "all"}
                  onChange={() => handleCategoryChange("all")}
                />
                <span>All Categories</span>
              </label>
              {categories.map(category => (
                <label key={category} className={`filter-option ${selectedCategory === category ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <h3 className="filter-title">Price Range</h3>
            <div className="price-range-inputs">
              <div className="price-input-group">
                <label htmlFor="min-price">Min (₹)</label>
                <input
                  type="number"
                  id="min-price"
                  name="min"
                  value={priceRange.min}
                  onChange={handlePriceRangeChange}
                  className="price-input"
                  min="0"
                />
              </div>
              <span className="price-separator">-</span>
              <div className="price-input-group">
                <label htmlFor="max-price">Max (₹)</label>
                <input
                  type="number"
                  id="max-price"
                  name="max"
                  value={priceRange.max}
                  onChange={handlePriceRangeChange}
                  className="price-input"
                  min="0"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Right Side - Products Grid */}
        <main className="products-content">
          {/* Results Info */}
          <div className="results-info">
            <p>
              {loading
                ? "Loading products..."
                : `Showing ${currentFilteredProducts.length} of ${filteredProducts.length} products`}
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="loading-message">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              {currentFilteredProducts.length > 0 ? (
                <div className="products-grid">
                  {currentFilteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="product-card"
                      onClick={() => handleCardClick(product.id)}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="product-image"
                      />
                      <h2 className="product-title">{product.title}</h2>
                      <p className="product-category">{product.category}</p>
                      <p className="product-price">₹{(product.price * 83).toFixed(2)}</p>
                      <button
                        className="add-to-cart-btn"
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-products">
                  <p>No products found with current filters</p>
                  <button onClick={clearAllFilters} className="btn-secondary">
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filteredProducts.length > 0 && totalFilteredPages > 1 && (
                <>
                  <div className="pagination-container">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                    >
                      Previous
                    </button>
                    <div className="page-numbers">
                      {[...Array(totalFilteredPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => paginate(index + 1)}
                          className={currentPage === index + 1 ? "page-btn-active" : "page-btn"}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalFilteredPages}
                      className="pagination-btn"
                    >
                      Next
                    </button>
                  </div>

                  <div className="page-info">
                    Page {currentPage} of {totalFilteredPages}
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;
