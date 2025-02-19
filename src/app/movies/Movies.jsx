"use client";

import { useState, useEffect } from "react";
import MovieDetails from "../components/MovieDetails";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:8081/movies";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    fetchMovies();
    checkUserRole();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error al cargar peliculas");
      }
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkUserRole = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found. User is not logged in.");
      setUserRole(null); //publico
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded Token Payload:", payload);
      setUserRole(payload.role);
    } catch (err) {
      console.error("Error decoding token:", err);
      setUserRole(null);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchMovies();
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/movies/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error("Error al buscar películas");
      }
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <div className="text-center mt-5">Cargando peliculas...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
      ) : (
        <>
          <h2 className="text-center mb-4">PELICULAS</h2>

          {/* Buscador */}
          <div className="row mb-4">
            <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por título, género o actor"
                value={searchQuery}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={handleSearch}>
                Buscar
              </button>
            </div>
          </div>

          {/* Listado de Películas */}
          <div className="row">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="col-md-4 col-sm-6 mb-4 movie-card"
                style={{ cursor: "pointer" }}
              >
                <div
                  className="card shadow-sm"
                  style={{
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img src={movie.image} alt={movie.title} style={{ objectFit: "cover" }} />
                  <div className="card-body text-center">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">
                      <strong>Duración:</strong> {movie.duration} minutos
                    </p>

                    {userRole && userRole.toUpperCase() === "USER" && (
                      <button className="btn btn-warning mt-2">
                        Escribir Reseña
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link href="/movies/add">
              <button className="btn btn-primary mt-4">Agregar Película</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Movies;
