
//ELIMINAR PELICULA

"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DeleteMovie() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");

  useEffect(() => {
    if (movieId) {
      deleteMovie(movieId);
    }
  }, [movieId]);

  const deleteMovie = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/movies/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la película");
      }

      alert("Película eliminada con éxito!");
      router.push("/"); 
    } catch (err) {
      alert(err.message);
      router.push("/");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Eliminando película...</h2>
    </div>
  );
}