import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditSpot = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedSpot, setSelectedSpot] = useState(null);
  const [newSpotName, setNewSpotName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const response = await fetch(`http://localhost:8081/spots/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch spot");
        }
        const data = await response.json();
        setSelectedSpot(data);
        setNewSpotName(data.spot_name);
        setNewLocation(data.location);
        setNewDescription(data.description);
        setPreview(`http://localhost:8081${data.image_url}`);
      } catch (error) {
        alert("Error fetching spot: " + error);
      }
    };
    fetchSpot();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setNewImage(null);
      setPreview(selectedSpot ? `http://localhost:8081${selectedSpot.image_url}` : null);
    }
  };

  const handleUpdateSpot = async (e) => {
    e.preventDefault();
    if (!selectedSpot) return;

    const formData = new FormData();
    formData.append("spot_name", newSpotName);
    formData.append("location", newLocation);
    formData.append("description", newDescription);

    if (newImage) {
      formData.append("image", newImage);
    } else {
      formData.append("image_url", selectedSpot.image_url);
    }

    try {
      const response = await fetch(`http://localhost:8081/spots/${selectedSpot.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error: " + errorData.error);
      } else {
        alert("Spot updated successfully!");
        navigate("/spots");
      }
    } catch (err) {
      alert("An error occurred: " + err);
    }
  };

  const handleDeleteSpot = async () => {
    if (!selectedSpot) return;
    try {
      const response = await fetch(`http://localhost:8081/spots/${selectedSpot.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error: " + errorData.error);
      } else {
        alert("Spot deleted successfully!");
        navigate("/spots");
      }
    } catch (err) {
      alert("An error occurred: " + err);
    }
  };

  if (!selectedSpot) {
    return <p>Loading spot...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Edit Spot: {selectedSpot.spot_name}</h3>
        <div>
          <button className="btn btn-danger me-2" onClick={handleDeleteSpot}>
            Delete Spot
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/spots')}>
            Back to All Spots
          </button>
        </div>
      </div>
      <form onSubmit={handleUpdateSpot}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Spot Name</label>
            <input
              type="text"
              className="form-control"
              value={newSpotName}
              onChange={(e) => setNewSpotName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Spot Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Update Spot
            </button>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="img-fluid"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                }}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminEditSpot;
