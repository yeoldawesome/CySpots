import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column vh-100 p-3 bg-light"
      style={{ width: "250px" }}
    >
      <h2 className="text-center">Navigation</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link text-dark">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/spots" className="nav-link text-dark">
            View Spots
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/add-spot" className="nav-link text-dark">
            Add Spot
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/search" className="nav-link text-dark">
            Search Spot
          </Link>
        </li>
        <li className="nav-item">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="btn btn-link text-dark">
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-link text-dark">
              Admin Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
