
//CREAR ACTOR

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateActor = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    nationality: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8081/actors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el actor");
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
            name="dob"
            className="form-control"
            value={formData.dob}
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