"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateActor = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    nationality: "",
    movies: [], // Store selected movie IDs
  });
  const [movies, setMovies] = useState([]); // Store available movies
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  // Fetch movie list
  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:8081/movies");
      if (!response.ok) {
        throw new Error("Error al cargar las películas");
      }
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle movie selection
  const handleMovieChange = (e) => {
    const selectedMovieIds = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, movies: selectedMovieIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      // Create Actor first
      const actorResponse = await fetch("http://localhost:8081/actors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          birthdate: formData.birthdate,
          nationality: formData.nationality,
        }),
      });
  
      if (!actorResponse.ok) {
        throw new Error("Error al agregar el actor");
      }
  
      const createdActor = await actorResponse.json();
      const actorId = createdActor.id; // Ensure we get the correct actor ID
  
      console.log("📌 Created Actor ID:", actorId);
  
      // If no movies were selected, just return
      if (!formData.movies || formData.movies.length === 0) {
        router.push("/actors");
        return;
      }
  
      // Associate Actor with selected Movies
      for (const movieId of formData.movies) {
        console.log(`📌 Adding Actor ID ${actorId} to Movie ID ${movieId}`);
  
        const associateResponse = await fetch(
          `http://localhost:8081/movies/${movieId}/actor/${actorId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!associateResponse.ok) {
          throw new Error(
            `Error al asociar el actor con la película ID: ${movieId}`
          );
        }
      }
  
      router.push("/actors");
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Agregar Actor</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de Nacimiento:</label>
          <input
            type="date"
            name="birthdate"
            className="form-control"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nacionalidad:</label>
          <input
            type="text"
            name="nationality"
            className="form-control"
            value={formData.nationality}
            onChange={handleChange}
            required
          />
        </div>

        {/* Dropdown for movie selection */}
        <div className="mb-3">
          <label className="form-label">Películas:</label>
          <select
            name="movies"
            className="form-control"
            multiple
            value={formData.movies}
            onChange={handleMovieChange}
          >
            <option value="">Ninguna</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success mt-3">
          Agregar Actor
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-3 ms-3"
          onClick={() => router.push("/actors")}
        >
          Volver a la lista de actores
        </button>
      </form>
    </div>
  );
};

export default CreateActor;
