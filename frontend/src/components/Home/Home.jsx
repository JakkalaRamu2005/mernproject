// src/pages/Home.js
import React from "react";
import "./home.css"; // Import the CSS file

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to Emmorce Store</h1>
      <p className="home-paragraph">
        Your one-stop shop for quality products at the best prices. Discover the
        latest trends, electronics, and essentials — all in one place!
      </p>

      <div className="home-image-container">
        <img
          src="https://res.cloudinary.com/dcsglluc4/image/upload/v1759896756/images_qjl0xj.jpg"
          alt="Shopping"
          className="home-image"
        />
        <img
          src="https://res.cloudinary.com/dcsglluc4/image/upload/v1759896756/download_bwivub.jpg"
          alt="Online Store"
          className="home-image"
        />
        <img
          src="https://res.cloudinary.com/dcsglluc4/image/upload/v1759896756/download_1_ilecyl.jpg"
          alt="E-commerce"
          className="home-image"
        />
      </div>
    </div>
  );
}

export default Home;
