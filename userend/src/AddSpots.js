import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddSpot = () => {
  const [spotName, setSpotName] = useState("");  
  const [location, setLocation] = useState("");  
  const [description, setDescription] = useState("");  
  const [image, setImage] = useState(null);  
  const [preview, setPreview] = useState(null);  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("spot_name", spotName); 
    formData.append("location", location);  
    formData.append("description", description);  
    formData.append("image", image); 
  
    try {
      const response = await fetch("http://localhost:8081/spots", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json(); 
        alert("Error adding spot: " + errorData.error);
      } else {
        const successMessage = await response.text(); 
        alert("Spot added successfully");
      }
    } catch (err) {
      alert("An error occurred: " + err);
    }

    setSpotName("");
    setLocation("");
    setDescription("");
    setImage(null);
    setPreview(null);
  };
  
  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Spot</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Spot Name</label>
          <input
            type="text"
            className="form-control"
            value={spotName}
            onChange={(e) => setSpotName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label> 
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Spot Image</label> 
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Add Spot
        </button>
      </form>
    </div>
  );
};

export default AddSpot;
