import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="list-group">
            <button onClick={() => window.location.href = "/movies"} className="btn btn-outline-dark w-100 p-2 m-2">
            Gestionar Películas
            </button>
            <button onClick={() => window.location.href = "/actors"} className="btn btn-outline-dark w-100 p-2 m-2">
            Gestionar Actores
            </button>
            <button onClick={() => window.location.href = "/users"} className="btn btn-outline-dark w-100 p-2 m-2">
            Gestionar Usuarios
            </button>
        </div>
    </div>
  );
};

export default AdminDashboard;