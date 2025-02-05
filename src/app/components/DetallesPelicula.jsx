"use client"; // Ensures this runs only on the client
import "bootstrap/dist/css/bootstrap.min.css";

const DetallesPelicula = ({ movie, onBack }) => {
  if (!movie) {
    return <h2 className="text-center mt-5">Pelicula no encontrada</h2>;
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
              <strong>Duración:</strong> {movie.duration}
            </p>
            <p>
              <strong>Año:</strong> {movie.year}
            </p>
            <p>
              <strong>Pais:</strong> {movie.country}
            </p>
            <p>
              <strong>Director:</strong> {movie.director}
            </p>
            <p>
              <strong>Genero:</strong> {movie.genre}
            </p>
            <p>
              <strong>Sinopsis:</strong> {movie.synopsis}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesPelicula;
