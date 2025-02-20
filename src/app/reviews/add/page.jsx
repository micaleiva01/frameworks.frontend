"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateReview = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movieId");

  const [reviewData, setReviewData] = useState({
    rating: 1,
    comment: "",
    username: "",
  });

  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    checkUserRole();
  }, []);

  useEffect(() => {
    if (movieId) {
      console.log("Movie ID:", movieId);
    }
  }, [movieId]);

  const checkUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserRole(null);
      alert("Debes iniciar sesión para escribir una reseña");
      router.push("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded Token:", payload);

      setUserRole(payload.role);
      setUsername(payload.sub);

      setReviewData((prev) => ({
        ...prev,
        username: payload.sub,
      }));
    } catch (err) {
      console.error("Error obteniendo token: ", err);
      setUserRole(null);
    }
  };

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");


    if (!movieId) {
      setError("Error: No se encontró la película.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8081/reviews/add/${movieId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: parseInt(reviewData.rating, 10),
          comment: reviewData.comment,
          username: reviewData.username,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la reseña");
      }

      alert("Reseña enviada con éxito.");
      router.push(`/movies`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (userRole !== "USER") {
    return <div className="text-center mt-5">Solo los usuarios registrados pueden escribir reseñas</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Escribir Reseña</h2>

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
          Enviar Reseña
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-3 ms-3"
          onClick={() => router.push("/movies")}
        >
          Volver a la lista de películas
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
