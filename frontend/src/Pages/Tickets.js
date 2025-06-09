import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import "../Components/addshowtimes.css";

const AddShowtime = () => {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    movieId: "",
    price: "",
    showtimes: [""],
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("http://localhost:5000/movies");
      const data = await res.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "showtimes") {
      const updated = [...formData.showtimes];
      updated[index] = value;
      setFormData({ ...formData, showtimes: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addShowtimeField = () => {
    setFormData((prev) => ({ ...prev, showtimes: [...prev.showtimes, ""] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/showtimes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    console.log(result);

    // Show popup
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);

    // Reset form
    setFormData({ movieId: "", price: "", showtimes: [""] });
  };

  return (
    <>
      <Sidebar />
      <div className="showtime-wrapper">
        <form onSubmit={handleSubmit} className="showtime-form">
          <h2>Add Showtime</h2>

          <label>
            Select Movie:
            <select
              name="movieId"
              value={formData.movieId}
              onChange={handleChange}
              required
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Ticket Price (USD):
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="e.g., 9.99"
              step="0.01"
            />
          </label>

          <label>Showtimes:</label>
          {formData.showtimes.map((time, idx) => (
            <input
              key={idx}
              type="time"
              name="showtimes"
              value={time}
              onChange={(e) => handleChange(e, idx)}
              required
            />
          ))}
          <button type="button" onClick={addShowtimeField} className="btn-secondary">
            + Add Showtime
          </button>

          <button type="submit" className="btn-primary">Save Showtime</button>
        </form>

        {showPopup && (
          <div className="popup">
            ✅ Showtime added successfully!
          </div>
        )}
      </div>
    </>
  );
};

export default AddShowtime;
