"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "../components/AdminDashboard";

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
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <section className="container mt-5">
      <h2>Bienvenido, {username}!</h2>

      <AdminDashboard />

      <button onClick={handleLogout} className="btn btn-danger mt-3">
        Logout
      </button>
    </section>
  );
};

export default Dashboard;
