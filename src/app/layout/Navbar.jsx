"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // If token exists, user is logged in
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false);
    setShowLogoutModal(false); // Close modal
    router.push("/login"); // Redirect to login page
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
              {/* Link to Movie List */}
              <li className="nav-item me-2">
                <Link href="/" passHref>
                  <button className="btn btn-outline-light">Películas</button>
                </Link>
              </li>
              {/* Link to Actor List */}
              <li className="nav-item me-2">
                <Link href="/actors" passHref>
                  <button className="btn btn-outline-light">Actores</button>
                </Link>
              </li>
              {/* Show "Cerrar Sesión" if logged in, otherwise "Iniciar Sesión" */}
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

      {/* Logout Confirmation Modal */}
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
