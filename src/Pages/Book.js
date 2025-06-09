import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";

const BookingForm = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [ticketQty, setTicketQty] = useState(1);
  const [ticketPrice, setTicketPrice] = useState(0); // 🆕 NEW STATE
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("http://localhost:5000/movies");
      const data = await res.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchShowtimes = async () => {
      if (!selectedMovieId) return;
      const res = await fetch("http://localhost:5000/showtimes");
      const data = await res.json();
      const match = data.find((item) => item.movieId === selectedMovieId);
      if (match) {
        setShowtimes(match.showtimes);
        setTicketPrice(match.price); // 🆕 set price from schema
      } else {
        setShowtimes([]);
        setTicketPrice(0);
      }
    };
    fetchShowtimes();
  }, [selectedMovieId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const getMinBookingDate = () => {
    const selectedMovie = movies.find((m) => m._id === selectedMovieId);
    if (selectedMovie && selectedMovie.releaseDate) {
      return new Date(selectedMovie.releaseDate).toISOString().split("T")[0];
    }
    return new Date().toISOString().split("T")[0];
  };

  const formatTimeAMPM = (time) => {
    if (!time || typeof time !== "string") return "";
    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  const totalAmount = ticketPrice * ticketQty; // 🧮 Total

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      movieId: selectedMovieId,
      showtime: selectedShowtime,
      date: selectedDate,
      quantity: ticketQty,
      name: userDetails.name,
      email: userDetails.email,
      contact: userDetails.contact,
      totalAmount,
    };

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Booking failed.");
      } else {
        alert("Booking successful!");
        setSelectedMovieId("");
        setSelectedShowtime("");
        setSelectedDate("");
        setTicketQty(1);
        setTicketPrice(0);
        setUserDetails({ name: "", email: "", contact: "" });
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred while booking.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🎟 Book Your Tickets</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          value={userDetails.name}
          placeholder="Your Name"
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          value={userDetails.email}
          placeholder="Email"
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <input
          type="tel"
          name="contact"
          value={userDetails.contact}
          placeholder="Contact Number"
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <select
          value={selectedMovieId}
          onChange={(e) => setSelectedMovieId(e.target.value)}
          required
          style={styles.select}
        >
          <option value="">🎬 Select a movie</option>
          {movies.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.title}
            </option>
          ))}
        </select>

        <select
          value={selectedShowtime}
          onChange={(e) => setSelectedShowtime(e.target.value)}
          required
          style={styles.select}
        >
          <option value="">🕒 Select showtime</option>
          {showtimes.map((time, idx) => (
            <option key={idx} value={time}>
              {formatTimeAMPM(time)}
            </option>
          ))}
        </select>

        {/* 💰 Show price and total */}
        {ticketPrice > 0 && (
          <p style={{ color: "#ccc" }}>
            🎫 Ticket Price: <strong>${ticketPrice}</strong><br />
            💵 Total: <strong>${totalAmount}</strong>
          </p>
        )}

        <input
          type="date"
          value={selectedDate}
          min={getMinBookingDate()}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="number"
          min="1"
          max="10"
          value={ticketQty}
          onChange={(e) => setTicketQty(Number(e.target.value))}
          required
          placeholder="Tickets"
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          ✅ Book Now
        </button>
      </form>
    </div>
    
  );
};

const styles = {
  container: {
    padding: "2rem",
    marginBottom: "2rem",
    maxWidth: "500px",
    margin: "0 auto",
    color: "white",
    backgroundColor: "#111",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },
  heading: {
    marginBottom: "1rem",
    textAlign: "center",
    fontSize: "1.8rem",
    color: "#00bcd4",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.7rem",
    borderRadius: "6px",
    border: "1px solid #444",
    background: "#222",
    color: "white",
  },
  select: {
    padding: "0.7rem",
    borderRadius: "6px",
    border: "1px solid #444",
    background: "#222",
    color: "white",
  },
  button: {
    padding: "0.8rem",
    backgroundColor: "#00bcd4",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default BookingForm;
