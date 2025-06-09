import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:5000/movies");
      if (!res.ok) throw new Error("Failed to fetch movies");
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const res = await fetch(`http://localhost:5000/movies/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete movie");

      // Remove movie from state to update UI
      setMovies((prev) => prev.filter((movie) => movie._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="content" style={{ padding: "1rem", flex: 1 }}>
        <h1 className="text-xl font-semibold mb-4">Movies List</h1>

        {loading && <p>Loading movies...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {movies.length === 0 && <p>No movies found.</p>}

            {movies.map((movie) => (
              <li
                key={movie._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {movie.posterUrl && (
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      style={{ width: "80px", borderRadius: "4px" }}
                    />
                  )}
                  <div>
                    <h2 style={{ margin: 0 }}>{movie.title}</h2>
                    <p style={{ margin: "0.5rem 0" }}>{movie.description}</p>
                    <p>
                      <strong>Genre:</strong> {movie.genre} |{" "}
                      <strong>Rating:</strong> {movie.rating} |{" "}
                      <strong>Release:</strong>{" "}
                      {new Date(movie.releaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Link
                    to={`/edit-movie/${movie._id}`}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#4caf50",
                      color: "white",
                      borderRadius: "4px",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(movie._id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MovieList;
