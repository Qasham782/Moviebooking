import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Components/showtimeList.css";
import Footer from "../Components/Footer";

const ShowtimeList = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const res = await fetch("http://localhost:5000/showtimes");
        const data = await res.json();
        setShowtimes(data);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      }
    };

    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5000/movies");
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchShowtimes();
    fetchMovies();
  }, []);

  const getMovieTitle = (movieId) => {
    const movie = movies.find((m) => m._id === movieId);
    return movie ? movie.title : "Unknown Movie";
  };

  return (
    <>
      <Navbar />
      <div className="ticket-wrapper no-sidebar">
        <h2>MOVIE TICKET INFO</h2>

        <div className="ticket-header">
          <img src="/2d.png" alt="2D Icon" className="ticket-icon" />
          <span>Digital 2D Movies Standard Rates</span>
          <span className="cinema-label">Cinema 1 to 11</span>
        </div>

        <table className="ticket-table">
          <tbody>
            {showtimes.length === 0 ? (
              <tr>
                <td colSpan="2">No showtimes available.</td>
              </tr>
            ) : (
              showtimes.map((show, index) => (
                <tr key={index}>
                  <td>{getMovieTitle(show.movieId)}</td>
                  <td>${parseFloat(show.price).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div
  className="terms-wrapper"
  style={{
    marginTop: "3rem",
    marginBottom: "3rem",
    padding: "1.5rem",
    backgroundColor: "#111",
    borderRadius: "8px",
    color: "white",
    maxWidth: "900px",
    marginInline: "auto",
    boxShadow: "8px 6px 9px rgba(199, 183, 183, 0.2)",
  }}
>
  <h3 className="terms-heading" style={{ marginBottom: "1rem" , color: "red" }}>
    Terms and Conditions
  </h3>
  <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", listStyleType: "disc" }}>
    <li>Tickets are Non-Refundable, Non-Exchangeable & Non-Transferable.</li>
    <li>Cinema entry allowed to vaccinated persons only.</li>
    <li>
      Management is not responsible for any compensation or refund if you do not attend the show mentioned on the ticket.
    </li>
    <li>The cinema complex is a No Smoking zone.</li>
    <li>Recording with a mobile or other camera is strictly prohibited.</li>
    <li>Mobile phone usage is strictly prohibited inside auditoriums.</li>
    <li>Children under 3 years and infants are not allowed inside the cinema.</li>
    <li>Children above 3 years will be charged full ticket price.</li>
    <li>Outside food or drinks are not allowed inside the cinema complex.</li>
    <li>
      You must keep your ticket throughout your visit. Entry may be denied without a valid ticket.
    </li>
    <li>
      Management reserves the right to deny entry or ask anyone to leave at any time without giving a reason.
    </li>
    <li>
      If a film is not exhibited on the scheduled date/time, a 100% refund will be provided.
    </li>
  </ul>
</div>

      </div>
      <Footer />
    </>
  );
};

export default ShowtimeList;
