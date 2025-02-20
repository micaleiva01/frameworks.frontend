"use client";

import React, { useState } from "react";
import Link from "next/link";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await res.text();
      if (res.ok) {
        setMessage(result);
        // Automatically redirect to /login after successful registration
        window.location.href = "/login";
      } else {
        setMessage(result);
        alert("Error: " + result);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error during registration. Please try again.");
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <form onSubmit={handleRegistration}>
                  <h2 className="fw-bold mb-2 text-uppercase">Registro</h2>
                  <p className="text-white-50 mb-5">Por favor ingresa tus datos para registrarte.</p>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="username"
                      className="form-control form-control-lg"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>

                  <button className="btn btn-outline-light btn-lg px-5" type="submit">
                    Registrarse
                  </button>
                </form>
                {message && <p className="mt-3">{message}</p>}
                <p className="mt-3">
                  ¿Ya tienes cuenta? <Link href="/login">Inicia sesión aquí</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
