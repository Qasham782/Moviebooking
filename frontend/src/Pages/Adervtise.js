import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../Components/Advertise.css";
import Footer from "../Components/Footer";

const Advertise = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for redirection

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ color: "#fff" }}>Loading movies...</p>;

  return (
    <div className="advertise-wrapper">
      <h2 className="advertise-heading">Now Showing</h2>
      <div className="movie-cards mt-5">
        {movies.map((movie) => (
          <div className="movie-card" key={movie._id}>
            <img src={movie.posterUrl} alt={movie.title} />
            <div className="card-info">
              <h3>{movie.title}</h3>
              <p>{movie.genre}</p>
              <p className="desc">{movie.description}</p>
              <span>⭐ {movie.rating}/10</span>
              <button
                className="book-btn"
                onClick={() => navigate(`/booking`)}
              >
                🎟 Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    
  );
};

export default Advertise;
