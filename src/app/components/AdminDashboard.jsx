import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {

  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.role !== "ADMIN") {
      router.push("/movies");
    } else {
      setRole("ADMIN");
    }
  }, [router]);

  if (role !== "ADMIN") {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">BIENVENIDO/A ADMINISTRADOR</h1>
      <div className="list-group">
        <a href="/manage-movies" className="list-group-item list-group-item-action">
          Gestionar Películas
        </a>
        <a href="/manage-actors" className="list-group-item list-group-item-action">
          Gestionar Actores
        </a>
        <a href="/manage-reviews" className="list-group-item list-group-item-action">
          Gestionar Reseñas
        </a>
        <a href="/manage-users" className="list-group-item list-group-item-action">
          Gestionar Usuarios
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;