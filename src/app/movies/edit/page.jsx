
//EDITAR PELICULA

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditMovie() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

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


  useEffect(() => {
    if (!id) {
      setError("Se requiere ID de la pelicula");
      return;
    }

    async function fetchMovie() {
      try {
        const response = await fetch(`http://localhost:8081/movies/${id}`);
        if (!response.ok) throw new Error("Error");
        const movie = await response.json();
        setFormData(movie);
      } catch (err) {
        console.error(err);
        setError("No se han podido cargar los detalles de la pelicula");
      }
    }
    fetchMovie();
  }, [id]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "image") {
        console.log("Updated image field:", e.target.value);
    }
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  console.log("Before processing:", formData.image);

  if (!formData.image.startsWith("http")) {
    setFormData({ ...formData, image: `http://localhost:8081/images/${formData.image}` });
  }

  console.log("Final image sent to backend:", formData.image);

  try {
    const response = await fetch(`http://localhost:8081/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${errorText}`);
    }

    router.push("/");
  } catch (err) {
    console.error("Failed to update movie:", err);
    setError("Error updating movie. Check console for details.");
  }
};



  if (!id) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Editar Película</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
        <div className="mb-3">
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

        <div className="mb-3">
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

        <div className="mb-3">
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

        <div className="mb-3">
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

        <div className="mb-3">
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

        <div className="mb-3">
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

        <div className="mb-3">
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

        <div className="mb-3">
          <label className="form-label">URL de la Imagen:</label>
          <input
            type="text"
            name="image"
            className="form-control"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={() => router.push("/")}>
          Guardar Cambios
        </button>

        <button className="btn btn-secondary mt-3 mb-5" onClick={() => router.push("/")}>
            Volver a la lista de películas
        </button>
      </form>
    </div>
  );
}
