import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To access the dynamic :id parameter
import "bootstrap/dist/css/bootstrap.min.css";

const SpotDetail = () => {
  const { id } = useParams(); // Get the spot id from the URL
  const [spot, setSpot] = useState(null); // State to hold the spot data

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const response = await fetch(`http://localhost:8081/spots/${id}`); // Fetch the spot by id
        if (!response.ok) {
          throw new Error("Failed to fetch spot");
        }
        const data = await response.json();
        setSpot(data); // Set the spot data to state
      } catch (error) {
        alert("Error loading spot details: " + error);
      }
    };
    fetchSpot();
  }, [id]); // Re-run the effect when the id changes

  if (!spot) {
    return <p>Loading...</p>; // Show loading message while the spot data is being fetched
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center"> {spot.spot_name}</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{spot.spot_name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{spot.location}</h6>
          {spot.image_url && (
            <img
              src={`http://localhost:8081${spot.image_url}`}
              alt={spot.spot_name}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          )}
                    <p className="card-text">{spot.description}</p>

        </div>
      </div>
    </div>
  );
};

export default SpotDetail;
