import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Spots = ({ spots, setSpots }) => {
  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await fetch("http://localhost:8081/spots"); // updated endpoint for spots
        if (!response.ok) {
          throw new Error("Failed to fetch spots");
        }
        const data = await response.json();
        setSpots(data);
      } catch (error) {
        alert("There was an error loading spots: " + error);
      }
    };
    fetchSpots();
  }, [setSpots]);

  return (
    <div className="container">
      <h2 className="text-center mt-4">Spots List</h2>
      <ul className="list-group">
        {spots.length > 0 ? (
          spots.map((spot) => (
            <li key={spot.id} className="list-group-item">
              <strong>{spot.spot_name}</strong> - {spot.location}
              <p>{spot.message}</p>
              {spot.image_url && (
                <img
                  src={`http://localhost:8081${spot.image_url}`}
                  alt={spot.spot_name}
                  style={{ width: '50px', height: '50px', marginRight: '15px', objectFit: 'cover' }}
                />
              )}
            </li>
          ))
        ) : (
          <p>No spots available</p>
        )}
      </ul>
    </div>
  );
};

export default Spots;
