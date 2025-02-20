"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useState, useEffect } from "react";

const MovieDetails = ({ movie, onBack }) => {
  const [userRole, setUserRole] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState("");
  const [editingReview, setEditingReview] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(1);

  // New state for editing movie details
  const [editingMovie, setEditingMovie] = useState(false);
  const [editedMovie, setEditedMovie] = useState(movie);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserRole(null);
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserRole(payload.role);
      setUsername(payload.sub);
    } catch (err) {
      console.error("Error decoding token:", err);
      setUserRole(null);
    }
  }, []);

  useEffect(() => {
    if (movie?.id) {
      fetch(`http://localhost:8081/reviews/movie/${movie.id}`)
        .then((res) => res.json())
        .then((data) => setReviews(data))
        .catch((err) => console.error("Error fetching reviews:", err));
    }
  }, [movie]);

  useEffect(() => {
    if (!editingMovie) {
      setEditedMovie(movie);
    }
  }, [movie, editingMovie]);

  // Updated movie deletion using the correct URL and auto-refresh
  const handleDeleteMovie = async () => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta película?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8081/movies/${movie.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        console.log("Movie deleted");
        window.location.reload();
      } else {
        console.error("Failed to delete movie");
      }
    } catch (err) {
      console.error("Error deleting movie:", err);
    }
  };

  // Updated movie editing using the correct URL and auto-refresh
  const handleEditMovieSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8081/movies/${movie.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedMovie),
      });
      if (response.ok) {
        console.log("Movie updated");
        window.location.reload();
      } else {
        console.error("Failed to update movie");
      }
    } catch (err) {
      console.error("Error updating movie:", err);
    }
  };

  const handleEditMovieCancel = () => {
    setEditingMovie(false);
    setEditedMovie(movie);
  };

  // Updated review deletion with auto-refresh
  const handleDelete = async (reviewId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta reseña?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8081/reviews/delete/${reviewId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        console.log("Review deleted");
        window.location.reload();
      } else {
        console.error("Failed to delete review");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  // Updated review editing with auto-refresh
  const handleEditSave = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8081/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: editRating, comment: editComment }),
      });
      if (response.ok) {
        console.log("Review updated");
        window.location.reload();
      } else {
        console.error("Failed to update review");
      }
    } catch (err) {
      console.error("Error updating review:", err);
    }
  };

  const handleEditClick = (review) => {
    setEditingReview(review.id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  const handleEditCancel = () => {
    setEditingReview(null);
    setEditComment("");
    setEditRating(1);
  };

  if (!movie) {
    return <h2 className="text-center mt-5">Película no encontrada</h2>;
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-primary mb-3" onClick={onBack}>
        Volver al Inicio
      </button>

      <div className="card shadow-lg p-4 mb-5">
        <div className="row">
          <div className="col-md-4">
            <img src={movie.image} className="img-fluid rounded" alt={movie.name} />
          </div>
          <div className="col-md-8">
            {editingMovie ? (
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editedMovie.title || ""}
                  onChange={(e) =>
                    setEditedMovie({ ...editedMovie, title: e.target.value })
                  }
                  placeholder="Título"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editedMovie.duration || ""}
                  onChange={(e) =>
                    setEditedMovie({ ...editedMovie, duration: e.target.value })
                  }
                  placeholder="Duración (minutos)"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editedMovie.year || ""}
                  onChange={(e) =>
                    setEditedMovie({ ...editedMovie, year: e.target.value })
                  }
                  placeholder="Año"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editedMovie.country || ""}
                  onChange={(e) =>
                    setEditedMovie({ ...editedMovie, country: e.target.value })
                  }
                  placeholder="País"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editedMovie.director || ""}
                  onChange={(e) =>
                    setEditedMovie({ ...editedMovie, director: e.target.value })
                  }
                  placeholder="Director"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editedMovie.genre || ""}
                  onChange={(e) =>
                    setEditedMovie({ ...editedMovie, genre: e.target.value })
                  }
                  placeholder="Género"
                />
                <textarea
                  className="form-control mb-2"
                  value={editedMovie.synopsis || ""}
                  onChange={(e) =>
                    setEditedMovie({ ...editedMovie, synopsis: e.target.value })
                  }
                  placeholder="Sinopsis"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editedMovie.image || ""}
                  onChange={(e) =>
                    setEditedMovie({ ...editedMovie, image: e.target.value })
                  }
                  placeholder="URL de la imagen"
                />
                <button className="btn btn-success me-2" onClick={handleEditMovieSave}>
                  Guardar
                </button>
                <button className="btn btn-secondary" onClick={handleEditMovieCancel}>
                  Cancelar
                </button>
              </div>
            ) : (
              <>
                <h2>{movie.title}</h2>
                {userRole === "ADMIN" && (
                  <div className="mb-3">
                    <button className="btn btn-warning me-2" onClick={() => setEditingMovie(true)}>
                      Editar Película
                    </button>
                    <button className="btn btn-danger" onClick={handleDeleteMovie}>
                      Eliminar Película
                    </button>
                  </div>
                )}
                <p><strong>Duración:</strong> {movie.duration} minutos</p>
                <p><strong>Año:</strong> {movie.year}</p>
                <p><strong>País:</strong> {movie.country}</p>
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Género:</strong> {movie.genre}</p>
                <p><strong>Sinopsis:</strong> {movie.synopsis}</p>
              </>
            )}

            <h2 className="text-2xl font-semibold mt-4">Reseñas</h2>
            {reviews.length > 0 ? (
              <ul className="list-group mt-3">
                {reviews.map((review) => (
                  <li key={review.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {editingReview === review.id ? (
                      <div className="w-100">
                        <div className="mb-2">
                          <label className="form-label">Calificación:</label>
                          <select className="form-control" value={editRating} onChange={(e) => setEditRating(Number(e.target.value))}>
                            <option value="1">1 - Muy mala</option>
                            <option value="2">2 - Mala</option>
                            <option value="3">3 - Regular</option>
                            <option value="4">4 - Buena</option>
                            <option value="5">5 - Excelente</option>
                          </select>
                        </div>

                        <div className="mb-2">
                          <label className="form-label">Comentario:</label>
                          <textarea className="form-control" value={editComment} onChange={(e) => setEditComment(e.target.value)} />
                        </div>

                        <button className="btn btn-success btn-sm me-2" onClick={() => handleEditSave(review.id)}>
                          Guardar
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={handleEditCancel}>
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div>
                        <strong>{review.username}:</strong>{" "}
                        <span>⭐{review.rating} - {review.comment}</span>
                      </div>
                    )}

                    {(userRole === "ADMIN" || username === review.username) && !editingReview && (
                      <div>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(review)}>
                          Editar
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(review.id)}>
                          Eliminar
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No hay reseñas aún.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
