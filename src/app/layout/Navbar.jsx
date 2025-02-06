import React from "react";
import Link from "next/link";

export default function MyNavbar() {
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
              {/* Login Button */}
              <li className="nav-item">
                <Link href="/login" passHref>
                  <button className="btn btn-light">Iniciar Sesión</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
