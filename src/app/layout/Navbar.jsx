"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

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
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    router.push("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <h1 className="navbar-brand">GESTIÓN DE PELÍCULAS</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">

              <li className="nav-item me-2">
                <Link href="/" passHref>
                  <button className="btn btn-outline-light">Películas</button>
                </Link>
              </li>

              <li className="nav-item me-2">
                <Link href="/actors" passHref>
                  <button className="btn btn-outline-light">Actores</button>
                </Link>
              </li>

              {userRole === "ADMIN" && (
                <li className="nav-item me-2">
                  <Link href="/dashboard" passHref>
                    <button className="btn btn-outline-light">Panel</button>
                  </Link>
                </li>
              )}

              <li className="nav-item">
                {isLoggedIn ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => setShowLogoutModal(true)}
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <Link href="/login" passHref>
                    <button className="btn btn-light">Iniciar Sesión</button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showLogoutModal && (
        <div
          className="modal d-block"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content text-center p-4">
              <h3>¿Estás seguro de que deseas cerrar sesión?</h3>
              <div className="mt-4">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
