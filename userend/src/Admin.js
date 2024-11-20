import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [spotName, setSpotName] = useState(""); // Spot name input for search
  const [spots, setSpots] = useState([]); // List of spots to display
  const [selectedSpot, setSelectedSpot] = useState(null); // Selected spot to edit
  const [newSpotName, setNewSpotName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  // Handle login functionality
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      alert("Login successful!");
    } else {
      alert("Invalid username or password.");
    }
  };

  // Fetch all spots when logged in
  useEffect(() => {
    if (isAuthenticated) {
      const fetchSpots = async () => {
        try {
          const response = await fetch("http://localhost:8081/spots");
          const data = await response.json();
          setSpots(data);
        } catch (error) {
          alert("Error fetching spots: " + error);
        }
      };
      fetchSpots();
    }
  }, [isAuthenticated]);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle search functionality for spots by name
  const handleSearch = (e) => {
    e.preventDefault();
    const foundSpot = spots.find(
      (spot) => spot.spot_name.toLowerCase() === spotName.toLowerCase()
    );
    if (foundSpot) {
      setSelectedSpot(foundSpot);
      setNewSpotName(foundSpot.spot_name);
      setNewLocation(foundSpot.location);
      setNewMessage(foundSpot.message);
      setPreview(`http://localhost:8081${foundSpot.image_url}`);
    } else {
      alert("Spot not found!");
    }
  };

  // Handle update of selected spot
  const handleUpdateSpot = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("spot_name", newSpotName);
    formData.append("location", newLocation);
    formData.append("message", newMessage);

    // Only append the image if a new one is selected
    if (newImage) {
      formData.append("image", newImage);
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

  return (
    <div className="container mt-4">
      {!isAuthenticated ? (
        <div>
          <h2 className="text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2 className="text-center">Edit Spot</h2>
          <form onSubmit={handleSearch}>
            <div className="mb-3">
              <label className="form-label">Search Spot by Name</label>
              <input
                type="text"
                className="form-control"
                value={spotName}
                onChange={(e) => setSpotName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          {selectedSpot && (
            <div>
              <h3>Edit Spot: {selectedSpot.spot_name}</h3>
              <form onSubmit={handleUpdateSpot}>
                <div className="mb-3">
                  <label className="form-label">Spot Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newSpotName}
                    onChange={(e) => setNewSpotName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
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
                  Update Spot
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;