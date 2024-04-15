import { useState, useEffect } from 'react';

const ImageSlider = ({ autoplayInterval = 3000 }) => {
    const images = [
        '/assets/banner/1.jpg',
        '/assets/banner/2.jpg',
        '/assets/banner/3.jpg',
        '/assets/banner/4.jpg',
        '/assets/banner/5.jpg',
        '/assets/banner/6.jpg',
        '/assets/banner/7.jpg',
        '/assets/banner/8.jpg',
        // Add more image paths as needed
      ];
      
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoplayInterval);

    return () => clearInterval(intervalId);
  }, [autoplayInterval, images.length]);

  return (
    <div className="image-slider" style={{ width: '60vw', maxHeight: "300px", overflow: 'hidden' }}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          style={{
            width: '100%',
            maxHeight: '280px',
            objectFit: 'cover',
            display: index === currentImageIndex ? 'block' : 'none'
          }} 
        />      
      ))}
    </div>
  );
};

export default ImageSlider;
