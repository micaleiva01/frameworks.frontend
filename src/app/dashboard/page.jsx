"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "../components/AdminDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to access the dashboard.");
      router.push("/login");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    setUsername(payload.sub);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(null);
    window.location.href = "/login";
  };

  return (
    <section className="container mt-5">
      <h2 className="text-center text-uppercase">Bienvenido, {username}!</h2>

      <AdminDashboard />

      <div className="d-grid gap-2 col-6 mx-auto mt-4">
      <button onClick={handleLogout} className="btn btn-danger mt-3">
        Cerrar Sesión
      </button>
      </div>
    </section>
  );
};

export default Dashboard;
