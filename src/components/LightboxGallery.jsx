import React, { useState, useEffect } from "react";
import "../style.css";

const images = [
  require("../images/img1.jpg"),
  require("../images/img2.jpg"),
  require("../images/img3.jpg"),
  require("../images/img4.jpg"),
  require("../images/img5.jpg"),
  require("../images/img6.jpg"),
];

const LightboxGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(null);

  const showLightbox = (index) => {
    setCurrentIndex(index);
  };

  const hideLightbox = () => {
    setCurrentIndex(null);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentIndex !== null) {
        if (e.key === "Escape") hideLightbox();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">My Image Gallery</h2>
      <div className="row g-3">
        {images.map((src, index) => (
          <div className="col-md-4" key={index}>
            <img
              src={src}
              className="gallery-img"
              alt={`Image ${index + 1}`}
              onClick={() => showLightbox(index)}
            />
          </div>
        ))}
      </div>

      {currentIndex !== null && (
        <div
          id="lightbox"
          className="active"
          onClick={(e) => {
            if (e.target.id === "lightbox") hideLightbox();
          }}
        >
          <span id="lightbox-close" onClick={hideLightbox}>
            &times;
          </span>
          <span className="lightbox-nav lightbox-prev" onClick={prevImage}>
            &#10094;
          </span>
          <img
            src={images[currentIndex]}
            id="lightbox-img"
            alt="Full View"
          />
          <span className="lightbox-nav lightbox-next" onClick={nextImage}>
            &#10095;
          </span>
        </div>
      )}
    </div>
  );
};

export default LightboxGallery;
