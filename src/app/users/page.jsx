
//listado de usuarios

"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:8081/users/userlist";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    fetchUsers();
    checkUserRole();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error al cargar los usuarios");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserRole(null);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserRole(payload.role);
    } catch (err) {
      console.error("Error obteniendo token:", err);
      setUserRole(null);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const promoteToAdmin = async (id) => {
    console.log("Promoting user ID:", id);
    try {
      const response = await fetch(`${API_URL}/${id}/promote`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Error al promover el usuario a admin");
      }
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };
  

  if (loading) return <div className="text-center mt-5">Cargando usuarios...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">GESTIONAR USUARIOS</h2>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-4 col-sm-6 mb-4">
            <div className="card shadow-sm p-3">
              <h5 className="card-title">{user.username}</h5>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Rol:</strong> {user.role}</p>
              {userRole === "ADMIN" && (
                <div className="d-flex justify-content-center mt-3">
                  <button className="btn btn-danger m-1" onClick={() => deleteUser(user.id)}>Eliminar</button>
                  {user.role !== "ADMIN" && (
                    <button className="btn btn-warning m-1" onClick={() => promoteToAdmin(user.id)}>Hacer Admin</button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
