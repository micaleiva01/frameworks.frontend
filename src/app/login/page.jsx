"use client";

import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch("http://localhost:8081/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        console.log("Full Backend Response:", data);

        if (!res.ok || !data.token || data.token.includes("No se ha encontrado usuario")) {
            console.error("Login Failed:", data);
            alert("Invalid username or password");
            return;
        }

        console.log("Token received:", data.token);
        localStorage.setItem("token", data.token);

        try {
            const payload = JSON.parse(atob(data.token.split(".")[1]));
            console.log("Decoded Payload:", payload);

            const userRole = payload.role || "USER";
            console.log("User Role:", userRole);

            window.location.href = userRole === "ADMIN" ? "/dashboard" : "/movies";
        } catch (decodeError) {
            console.error("Error decoding JWT:", decodeError);
            alert("Login successful, but an error occurred. Try again.");
        }

    } catch (error) {
        console.error("Error during login:", error);
        alert("Error processing login. Please try again.");
    }
  };


  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <form onSubmit={handleLogin}>
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="username"
                      className="form-control form-control-lg"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>

                  <button className="btn btn-outline-light btn-lg px-5" type="submit">
                    Login
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;