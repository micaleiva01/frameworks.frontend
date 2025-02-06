"use client"; // Ensures this runs only on the client
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

const MovieDetails = ({ movie, onBack }) => {
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
            <h2>{movie.name}</h2>
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

            <h2 className="text-2xl font-semibold mt-6">Actors</h2>
            {movie.actors && movie.actors.length > 0 ? (
              <ul className="list-disc pl-5 mt-2">
                {movie.actors.map((actor) => (
                  <li key={actor.id} className="py-1">
                    {actor.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay actores asociados a esta pelicula</p>
            )}

            {/* Buttons for Admin Actions */}
            <div className="mt-4">
            <Link href={`/movies/edit?id=${movie.id}`}>
              <button className="btn btn-warning m-2">Modificar Película</button>
            </Link>

            <Link href={`/movies/delete?id=${movie.id}`}>
              <button className="btn btn-danger m-2">Eliminar Película</button>
            </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
