"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

const EditReview = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reviewId = searchParams.get("reviewId");

  const [reviewData, setReviewData] = useState({
    rating: 1,
    comment: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!reviewId) {
      setError("Se requiere ID de la reseña");
      return;
    }

    async function fetchReview() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8081/reviews/${reviewId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Error al obtener la reseña");
        const review = await response.json();
        setReviewData(review);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la reseña");
      }
    }

    fetchReview();
  }, [reviewId]);

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8081/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: reviewData.rating,
          comment: reviewData.comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la reseña");
      }

      alert("Reseña actualizada con éxito.");
      router.push(`/movies`);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (!reviewId) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Reseña</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
        <div className="mb-3">
          <label className="form-label">Calificación:</label>
          <select
            name="rating"
            className="form-control"
            value={reviewData.rating}
            onChange={handleChange}
            required
          >
            <option value="1">1 - Muy mala</option>
            <option value="2">2 - Mala</option>
            <option value="3">3 - Regular</option>
            <option value="4">4 - Buena</option>
            <option value="5">5 - Excelente</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Comentario:</label>
          <textarea
            name="comment"
            className="form-control"
            value={reviewData.comment}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success mt-3">
          Guardar Cambios
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-3 ms-3"
          onClick={() => router.push("/movies")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditReview;
