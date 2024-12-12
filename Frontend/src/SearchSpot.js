import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchSpot = ({ isAuthenticated }) => {
  const [spotName, setSpotName] = useState("");
  const [spots, setSpots] = useState([]);
  const [foundSpot, setFoundSpot] = useState(null);

  useEffect(() => {
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
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = spots.find(
      (spot) => spot.spot_name.toLowerCase().includes(spotName.toLowerCase())
    );
    if (found) {
      setFoundSpot(found);
    } else {
      alert("Spot not found!");
      setFoundSpot(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Search for a Spot</h2>
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

      {foundSpot && (
        <div className="mt-4">
          <h3>Found Spot: {foundSpot.spot_name}</h3>
          <p><strong>Location:</strong> {foundSpot.location}</p>
          <p>{foundSpot.description}</p>
          {foundSpot.image_url && (
            <img
              src={`http://localhost:8081${foundSpot.image_url}`}
              alt={foundSpot.spot_name}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
            />
          )}
          <div className="mt-3">
            <Link
              to={
                isAuthenticated
                  ? `/admin/spot/${foundSpot.id}`
                  : `/spot/${foundSpot.id}`
              }
              className="btn btn-primary"
            >
              {isAuthenticated ? "Edit this Spot" : "View this Spot"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSpot;
