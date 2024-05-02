import { useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Banner = () => {
    const url =
  process.env.NODE_ENV === "production"
    ? "https://www.eurobrand.ba/api"
    : "http://localhost:8080";

    const theme = useTheme();
    const downMd = useMediaQuery(theme.breakpoints.down(1150));
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchImages = async () => {
    const response = await axios.get(url + "/products");
    
    setProducts(response.data); 
    // Extract image URLs from products and set them in the images state
    const imageUrls = response.data.map((product) => product.images[0].imageUrl);
    setImages(imageUrls); 
  }

  useEffect(() => {
    fetchImages();
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="banner-container">
      <button className="arrow-button left" onClick={goToPrevious}>
        &lt;
      </button>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Banner Image ${index + 1}`}
          className={index === currentImageIndex ? 'active' : ''}
        />
      ))}
      <button className="arrow-button right" onClick={goToNext}>
        &gt;
      </button>
      <style jsx>{`
        .banner-container {
          width: 100%;
          height: ${downMd ? "15vh" : "30vh"}; /* 10% of viewport height */
          overflow: hidden;
          position: relative;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .active {
          opacity: 1;
        }
        .arrow-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.5);
          border: none;
          font-size: 24px;
          padding: 5px 10px;
          cursor: pointer;
          z-index: 1;
        }
        .left {
          left: 10px;
        }
        .right {
          right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Banner;
