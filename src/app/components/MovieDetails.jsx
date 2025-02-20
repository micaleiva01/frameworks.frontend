//'pop up' de las peliculas

"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useState, useEffect } from "react";

const MovieDetails = ({ movie, onBack }) => {

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUserRole(null);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserRole(payload.role);
    } catch (err) {
      console.error("Error decoding token:", err);
      setUserRole(null);
    }
  }, []);

  if (!movie) {
    return <h2 className="text-center mt-5">Película no encontrada</h2>;
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-primary mb-3" onClick={onBack}>
        Volver al Inicio
      </button>

      <div className="card shadow-lg p-4">
        <div className="row">
          <div className="col-md-4">
            <img src={movie.image} className="img-fluid rounded" alt={movie.name} />
          </div>
          <div className="col-md-8">
            <h2>{movie.title}</h2>
            <p>
              <strong>Duración:</strong> {movie.duration} minutos
            </p>
            <p>
              <strong>Año:</strong> {movie.year}
            </p>
            <p>
              <strong>País:</strong> {movie.country}
            </p>
            <p>
              <strong>Director:</strong> {movie.director}
            </p>
            <p>
              <strong>Género:</strong> {movie.genre}
            </p>
            <p>
              <strong>Sinopsis:</strong> {movie.synopsis}
            </p>

            <h2 className="text-2xl font-semibold mt-4">Actores</h2>
            {movie.actors && movie.actors.length > 0 ? (
              <div className="row">
                {movie.actors.map((actor) => (
                  <div key={actor.id} className="col-md-4 col-sm-6 mb-3">
                    <div className="card shadow-sm h-100">
                      <div className="card-body text-center">
                        <h5 className="card-title">{actor.name}</h5>
                        <p className="card-text">
                          <strong>Nacionalidad:</strong> {actor.nationality}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No hay actores asociados a esta película.</p>
            )}

           
            {userRole === "ADMIN" && (
              <div className="mt-4">
                <Link href={`/movies/edit?id=${movie.id}`}>
                  <button className="btn btn-warning m-2">Modificar Película</button>
                </Link>
    
                <Link href={`/movies/delete?id=${movie.id}`}>
                  <button className="btn btn-danger m-2">Eliminar Película</button>
                </Link>
              </div>
            )}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
