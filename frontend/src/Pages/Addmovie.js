import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import "../Components/content.css";
import "../Components/addmovie.css";

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseDate: "",
    genre: "",
    rating: "",
    posterUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("http://localhost:5000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          rating: Number(formData.rating),
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to add movie");
      }

      const data = await response.json();
      setMessage("Movie added successfully!");
      setShowPopup(true);
      setFormData({
        title: "",
        description: "",
        releaseDate: "",
        genre: "",
        rating: "",
        posterUrl: "",
      });

      // Auto-hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="content" style={{ maxWidth: "600px", padding: "1rem" }}>
        <h1 className="text-xl font-semibold mb-4">Add Movie</h1>

        {/* Popup notification */}
        {showPopup && (
          <div
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              position: "fixed",
              top: "20px",
              right: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              transition: "opacity 0.3s ease",
            }}
          >
            Movie added successfully!
          </div>
        )}

        <div className="add-movie-form">
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
              />
            </label>

            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
              />
            </label>

            <label>
              Release Date:
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
              />
            </label>

            <label>
              Genre:
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
              />
            </label>

            <label>
              Rating:
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
                min="0"
                max="10"
                step="0.1"
                style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
              />
            </label>

            <label>
              Poster URL:
              <input
                type="url"
                name="posterUrl"
                value={formData.posterUrl}
                onChange={handleChange}
                placeholder="https://example.com/poster.jpg"
                style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#232946",
                color: "#eebbc3",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Adding..." : "Add Movie"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMovie;
