import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Spots = ({ spots, setSpots, isAuthenticated }) => {
  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await fetch("http://localhost:8081/spots");
        if (!response.ok) {
          throw new Error("Failed to fetchspots");
        }
        const data = await response.json();
        setSpots(data);
      } catch (error) {
        alert("There was an erro loading spots: " + error);
      }
    };
    fetchSpots();
  }, [setSpots]);

  return (
    <div className="container">
      <h2 className="text-center mt-4">Spots List</h2>
      <div className="row">
        {spots.length > 0 ? (
          spots.map((spot) => (
            <div key={spot.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <Link 
                  to={isAuthenticated ? `/admin/spot/${spot.id}` : `/spot/${spot.id}`} 
                  className="text-dark"
                >
                  <div className="card-body">
                    <h5 className="card-title">{spot.spot_name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{spot.location}</h6>
                    {spot.image_url && (
                      <img
                        src={`http://localhost:8081${spot.image_url}`}
                        alt={spot.spot_name}
                        className="card-img-top"
                        style={{ objectFit: 'cover', height: '200px' }}
                      />
                    )}
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No spots available</p>
        )}
      </div>
    </div>
  );
};

export default Spots;
