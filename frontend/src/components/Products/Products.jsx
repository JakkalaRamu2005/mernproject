// src/pages/Products.js
import React, { useEffect, useState } from "react";
import "./products.css";
import "./filter.css"
// import "./filterproducts.css"
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



  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [categories, setCategories] = useState([]);


  // Fetch products from API
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
        const maxPrice = Math.floor(Math.max(...prices));

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

  }


  const getFilteredProucts = () => {
    let filtered = products;

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchLower) || product.category.toLowerCase().includes(searchLower)
        );
      });
    }


    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => {
      const priceINR = product.price * 83;
      return priceINR >= priceRange.min && priceINR <= priceRange.max;
    })

    return filtered;
  }




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
  }

  if (loading) {
    return (
      <div className="products-container">
        <div className="loading-spinner">Loading products...</div>
      </div>
    );
  }


  const filteredProducts = getFilteredProucts();
  const totalFilteredPages = Math.ceil(filteredProducts.length / productsPerpage);
  const indexOfLastFilteredProduct = currentPage * productsPerpage;
  const indexOfFirstFilteredProduct = indexOfLastFilteredProduct - productsPerpage;
  const currentFilteredProducts = filteredProducts.slice(indexOfFirstFilteredProduct, indexOfLastFilteredProduct)




  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const nextPage = () => {
    if (currentPage < totalFilteredPages) {
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

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev, [name]: parseInt(value )
    }));
    setCurrentPage(1);
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  }




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
          <button onClick={() => setSearchQuery("")} className="clear-search-btn">Clear Search</button>
        )}

      </div>



      <div className="filters-container">
        <h1>Filters</h1>

        <div className="filter-group">
          <label htmlFor="category-filter">Category:</label>
          <select id="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="filter-select"

          ><option value="all">All Categories</option>

            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}

          </select>
        </div>



        <div className="filter-group">
          <label> Price Range:</label>
          <div className="price-range-container">
            <div className="price-input-group">
              <label htmlFor="min-price">Min:</label>
              <input type="number" id="min-price" name="min" value={priceRange.min}
                onChange={handlePriceRangeChange}
                className="price-input"
                min="0"
              />
            </div>

            <span className="price-separator">-</span>
            <div className="price-input-group">
              <label htmlFor="max-price">Max:</label>
              <input type="number" id="max-price" name="max" value={priceRange.max} min="0" className="price-input" onChange={handlePriceRangeChange} />
            </div>
          </div>
        </div>
      </div>


      <button className="clear-filters-btn" onClick={clearAllFilters}>
        Clear All Filters
      </button>






      <div className="results-info">
        <p>Showing {filteredProducts.length} product(s)</p>
        {(searchQuery || selectedCategory !== "all") && (
          <p className="active-filters">
            Active filters:
            {searchQuery && <span className="filter-tag">Search: "{searchQuery}"</span>}
            {selectedCategory !== "all" && <span className="filter-tag">Category: {selectedCategory}</span>}
          </p>
        )}
      </div>





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
              <p className="product-category">{product.category}</p>
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
            <p>No products found with current filters</p>
            <button onClick={clearAllFilters} className="clear-search-btn">Clear ALL filters</button>
          </div>
        )}
      </div>


      {filteredProducts.length > 0 && totalFilteredPages && (
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
