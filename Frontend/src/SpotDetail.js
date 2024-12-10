import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SpotDetail = () => {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const response = await fetch(`http://localhost:8081/spots/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch spot");
        }
        const data = await response.json();
        setSpot(data);
      } catch (error) {
        alert("Error loading spot details: " + error);
      }
    };
    fetchSpot();
  }, [id]);

  if (!spot) {
    return <p>Loading...</p>;
  }

  return (
    <div className="d-flex justify-content-center align-items-start" style={{ minHeight: "100vh", paddingTop: "50px" }}>
      <div className="card" style={{ width: "80%" }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h2 className="card-title">{spot.spot_name}</h2>
              <h6 className="card-subtitle mb-2 text-muted">{spot.location}</h6>
              <p className="card-text">{spot.description}</p>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              {spot.image_url && (
                <img
                  src={`http://localhost:8081${spot.image_url}`}
                  alt={spot.spot_name}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotDetail;
