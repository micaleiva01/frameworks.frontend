
//LISTADO ACTORES

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:8081/actors";

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.error("Error:", err);
        setUserRole(null);
      }
    }, [])

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error al cargar los actores");
      }
      const data = await response.json();
      setActors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando actores...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">ACTORES</h2>
      <div className="row">
        {actors.map((actor) => (
          <div
          key={actor.id}
          className="col-md-4 col-sm-6 mb-4 actor-card"
          style={{
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div
            className="card shadow-sm"
          >
            <div className="card-body text-center">
              <h5 className="card-title">{actor.name}</h5>
              <p className="card-text">
                <strong>Fecha de Nacimiento:</strong> {actor.birthdate ? actor.birthdate : "No disponible"}
              </p>
              <p className="card-text">
                <strong>Nacionalidad:</strong> {actor.nationality}
              </p>
            </div>
            {userRole === "ADMIN" && (
                <div className="d-flex justify-content-center mt-3">
                  <Link href={`/actors/edit/${actor.id}`}>
                    <button className="btn btn-warning m-1">Editar</button>
                  </Link>
                  <Link href={`/actors/delete/${actor.id}`}>
                    <button className="btn btn-danger m-1">Eliminar</button>
                  </Link>
                </div>
              )}
          </div>
        </div>        
        ))}
      </div>
      {userRole === "ADMIN" && (
        <div className="text-center mt-4">
          <Link href="/actors/add">
            <button className="btn btn-primary">Añadir Actor</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Actors;
