import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Admin = ({ isAuthenticated, setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/spots/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        return;
      }
  
      const data = await response.json();
      if (data.role) {
        setIsAuthenticated(true);
        alert("Login successful!");
        navigate("/spots");
      } else {
        alert("Invalid username or password.");
      }
    } catch (error) {
      alert("An error occurred during login: " + error.message);
    }
  };

  if (isAuthenticated) {
    navigate("/spots");
  }

  return (
    <div className="container mt-4">
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
  );
};

export default Admin;
