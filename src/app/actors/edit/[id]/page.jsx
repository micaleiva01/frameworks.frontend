//EDITAR ACTOR

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const EditActor = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    nationality: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const response = await fetch(`http://localhost:8081/actors/${id}`);
        if (!response.ok) {
          throw new Error("Error fetching actor details");
        }
        const data = await response.json();
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchActor();
  }, [id]);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        const response = await fetch(`http://localhost:8081/actors/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                birthdate: formData.dob,
                nationality: formData.nationality
            }),
        });

        if (!response.ok) {
            throw new Error(`Error updating actor: ${response.status}`);
        }

        console.log("Actor updated successfully");
        router.push("/actors");
    } catch (error) {
        console.error("Failed to update actor", error);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading actor details...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Actor</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nationality:</label>
          <input
            type="text"
            className="form-control"
            value={formData.nationality}
            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Update Actor</button>
      </form>
    </div>
  );
};

export default EditActor;
