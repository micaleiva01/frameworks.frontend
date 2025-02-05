"use client";
import { useState, useEffect } from "react";
import DetallesPelicula from "../components/DetallesPelicula";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:8080/movies";

const Peliculas = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
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

  if (loading) return <div className="text-center mt-5">Cargando peliculas...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      {selectedMovie ? (
        <DetallesPelicula movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
      ) : (
        <>
          <h2 className="text-center mb-4">PELICULAS</h2>
          <div
            className="row"
            onClick={(e) => {
              const movieId = e.target.closest(".movie-card")?.dataset.id;
              if (movieId) {
                setSelectedMovie(movies.find((m) => m.id === parseInt(movieId)));
              }
            }}
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="col-md-4 col-sm-6 mb-4 movie-card"
                data-id={movie.id}
              >
                <div className="card shadow-sm">
                  <img src={movie.image} className="card-img-top" alt={movie.title} />
                  <div className="card-body text-center">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">
                      <strong>Duration:</strong> {movie.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Peliculas;
