
//CREAR PELICULA

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddMovie() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    duration: "",
    country: "",
    director: "",
    genre: "",
    synopsis: "",
    image: "",
  });
  const [error, setError] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: name === "year" || name === "duration" ? Number(value) : value,
    });
};


const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
      const response = await fetch("http://localhost:8080/movies", {
          method: "POST",
          headers: {
              "Content-Type": "application/json" // Make sure there is no charset=UTF-8
          },
          body: JSON.stringify(formData),
      });

      const text = await response.text();
      console.log("Response:", text);

      if (!response.ok) {
          throw new Error("Error al agregar la película: " + text);
      }

      router.push("/");
  } catch (err) {
      console.error("Error:", err);
      setError(err.message);
  }
};


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Agregar Película</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Título:</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Año:</label>
            <input
              type="number"
              name="year"
              className="form-control"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Duración (min):</label>
            <input
              type="number"
              name="duration"
              className="form-control"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">País:</label>
            <input
              type="text"
              name="country"
              className="form-control"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Director:</label>
            <input
              type="text"
              name="director"
              className="form-control"
              value={formData.director}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Género:</label>
            <input
              type="text"
              name="genre"
              className="form-control"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Sinopsis:</label>
            <textarea
              name="synopsis"
              className="form-control"
              rows="3"
              value={formData.synopsis}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="col-md-12">
            <label className="form-label">URL de la Imagen:</label>
            <input
              type="text"
              name="image"
              className="form-control"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-4">
          Agregar Película
        </button>
      </form>
      <button className="btn btn-secondary mt-3 mb-5" onClick={() => router.push("/")}>
        Volver a la lista de películas
      </button>
    </div>
  );
}
