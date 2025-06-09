import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    releaseDate: "",
    genre: "",
    rating: "",
    posterUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movie data on mount
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:5000/movies/${id}`);
        if (!res.ok) throw new Error("Failed to fetch movie");
        const data = await res.json();

        // Format releaseDate to yyyy-mm-dd for input[type=date]
        const formattedDate = new Date(data.releaseDate)
          .toISOString()
          .substring(0, 10);

        setMovie({ ...data, releaseDate: formattedDate });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update movie");
      }

      alert("Movie updated successfully!");
      navigate("/movies-list");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading movie data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="content" style={{ padding: "1rem", flex: 1 }}>
        <h1 className="text-xl font-semibold mb-4">Edit Movie</h1>

        <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={movie.title}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Description:
            <textarea
              name="description"
              value={movie.description}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Release Date:
            <input
              type="date"
              name="releaseDate"
              value={movie.releaseDate}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Genre:
            <input
              type="text"
              name="genre"
              value={movie.genre}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Rating:
            <input
              type="number"
              name="rating"
              min="0"
              max="10"
              step="0.1"
              value={movie.rating}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Poster URL:
            <input
              type="url"
              name="posterUrl"
              value={movie.posterUrl}
              onChange={handleChange}
              placeholder="https://example.com/poster.jpg"
            />
          </label>
          <br />

          <button
            type="submit"
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Update Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;
