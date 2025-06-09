import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./carousel.css";

const images = [
  {
    src: "/carousel1.jpg",
    heading: "BALLERINA",
    subheading: "FROM THE WORLD OF JOHN WICK",
    tagline: "June 6, 2025",
    color: "#ff00ff",
    shadow: "0 0 5px #ff00ff, 0 0 15px #ff00ff, 0 0 25px #ff00ff",
  },
  {
    src: "/carousel2.jpeg",
    heading: "Mission: Impossible ",
    subheading: "Final Reckoning",
    tagline: "22nd May, 2025",
    color: "red",
    shadow: "0 0 5px red, 0 0 15px red, 0 0 25px red",
  },
  {
    src: "/carousel3.jpg",
    heading: "Jurassic World Rebirth",
    subheading: "A New Era Begins",
    tagline: "2nd July, 2025",
    color: "yellow",
    shadow: "0 0 5px yellow, 0 0 15px yellow, 0 0 25px yellow",
  },
  {
    src: "/carousel4.jpg",
    heading: "Superman",
    subheading: "Look Up",
    tagline: "11th July, 2025",
    color: "yellow",
    shadow: "0 0 5px red, 0 0 15px red, 0 0 25px red",
  },
  {
    src: "/carousel5.jpg",
    heading: "Fantastic Four",
    subheading: "First Steps",
    tagline: "25th July, 2025",
    color: "#158FD4",
    shadow: "0 0 5px #158FD4, 0 0 15px #158FD4, 0 0 25px #158FD4",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(null);
  const isDragging = useRef(false);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleStart = (clientX) => {
    startX.current = clientX;
    isDragging.current = true;
  };

  const handleMove = (clientX) => {
    if (!isDragging.current || startX.current === null) return;
    const diff = startX.current - clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
      startX.current = null;
      isDragging.current = false;
    }
  };

  const handleTouchStart = (e) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);
  const handleMouseDown = (e) => handleStart(e.clientX);
  const handleMouseMove = (e) => handleMove(e.clientX);
  const handleMouseUp = () => {
    isDragging.current = false;
    startX.current = null;
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="position-relative overflow-hidden shadow"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        height: "450px",
        width: "100%",
        userSelect: "none",
        cursor: "pointer",
      }}
    >
      {/* Sliding Images */}
      <div
        className="carousel-slider d-flex"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
          transition: "transform 0.6s ease-in-out",
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={`Slide ${index + 1}`}
            className="carousel-slide"
            style={{
              width: `${100 / images.length}%`,
              height: "450px",
              objectFit: "cover",
            }}
          />
        ))}
      </div>

      {/* Text Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center px-5"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.3) 70%)",
          color: "white",
        }}
      >
        <p className="fs-6 text-uppercase text-white-50 mb-1">
          {images[currentIndex].tagline}
        </p>
        <h2
          className="caro mb-1 display-6 fw-bold"
          style={{
            letterSpacing: "1px",
            color: images[currentIndex].color,
            textShadow: images[currentIndex].shadow,
          }}
        >
          {images[currentIndex].heading}
        </h2>
        <h5 className="fw-semibold">{images[currentIndex].subheading}</h5>
      </div>

      {/* Pagination Dots */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x pb-3">
        <div className="d-flex gap-2">
          {images.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: i === currentIndex ? "white" : "gray",
                cursor: "pointer",
              }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
