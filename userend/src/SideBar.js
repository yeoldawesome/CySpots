import React from "react";
import { Link } from "react-router-dom";
const Sidebar = ({ userRole }) => {
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
        {userRole === "admin" && (
          <>
          <li className="nav-item">
          <Link to="/admin" className="nav-link text-dark"> {/* New link to Admin */}
            Admin
          </Link>
        </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
