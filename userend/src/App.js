import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import AddSpot from "./AddSpots";
import Spots from "./Spots";
import SpotDetail from "./SpotDetail";
import Admin from "./Admin";
import AdminEditSpot from "./AdminEditSpot";
import SearchSpot from "./SearchSpot";

function App() {
  const [spots, setSpots] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Helmet>
        <title>CySpots</title>
      </Helmet>
      <div className="d-flex">
        <Sidebar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className="flex-grow-1 p-3">
          <h1 className="text-center">CySpots</h1>
          <Routes>
            <Route
              path="/"
              element={
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                  <div className="text-center">
                    <h2>Welcome to CySpots!</h2>
                    <p>Your go-to platform for discovering cool spots around Iowa State University. Explore, add, and update your favorite spots!</p>
                  </div>
                </div>
              }
            />
            <Route
              path="/spots"
              element={<Spots spots={spots} setSpots={setSpots} isAuthenticated={isAuthenticated} />}
            />
            <Route path="/add-spot" element={<AddSpot />} />
            <Route path="/login" element={<Admin isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
            <Route
              path="/admin/spot/:id"
              element={isAuthenticated ? <AdminEditSpot /> : <Navigate to="/login" />}
            />
            <Route path="/spot/:id" element={<SpotDetail />} />
            <Route path="/search" element={<SearchSpot isAuthenticated={isAuthenticated} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
