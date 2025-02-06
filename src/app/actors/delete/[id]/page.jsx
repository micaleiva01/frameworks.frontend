
//ELIMINAR ACTOR

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const DeleteActor = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id; // Ensure we get the ID

  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchActor = async () => {
      try {
        const response = await fetch(`http://localhost:8080/actors/${id}`);
        if (!response.ok) {
          throw new Error("Actor not found");
        }
        const data = await response.json();
        setActor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActor();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/actors/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error deleting actor: ${response.status}`);
      }

      alert("Actor deleted successfully!");
      router.push("/actors"); // Redirect to actor list
    } catch (err) {
      console.error("Failed to delete actor", err.message);
      alert("Failed to delete actor.");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading actor details...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Delete Actor</h2>
      <div className="alert alert-warning text-center">
        <p>Are you sure you want to delete this actor?</p>
        <h4>{actor?.name}</h4>
        <p><strong>Date of Birth:</strong> {actor?.dob}</p>
        <p><strong>Nationality:</strong> {actor?.nationality}</p>
      </div>
      
      <div className="d-flex justify-content-center">
        <button className="btn btn-danger mx-2" onClick={handleDelete}>Confirm Delete</button>
        <button className="btn btn-secondary mx-2" onClick={() => router.push("/actors")}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteActor;
