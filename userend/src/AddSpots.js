import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddSpot = () => {
  const [spotName, setSpotName] = useState("");  // updated variable name
  const [location, setLocation] = useState("");  // updated variable name
  const [message, setMessage] = useState("");
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
    formData.append("spot_name", spotName);  // updated key for spot name
    formData.append("location", location);  // updated key for location
    formData.append("message", message);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8081/spots", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error: " + errorData.error);
      } else {
        const successMessage = await response.text();
        alert(successMessage);
      }
    } catch (err) {
      alert("An error occurred: " + err);
    }

    // Clear form fields after submission
    setSpotName("");
    setLocation("");
    setMessage("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Spot</h2> {/* updated title */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Spot Name</label> {/* updated label */}
          <input
            type="text"
            className="form-control"
            value={spotName}
            onChange={(e) => setSpotName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label> {/* updated label */}
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Spot Image</label> {/* updated label */}
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
          Add Spot {/* updated button text */}
        </button>
      </form>
    </div>
  );
};

export default AddSpot;
