import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./SideBar";
import AddSpot from "./AddSpots";  // Import AddSpot (renamed)
import Spots from "./Spots";  // Import Spots instead of Contacts
import Admin from "./Admin";  // Import Admin component
import SpotDetail from "./SpotDetail"; // Import SpotDetail

function App() {
  const [spots, setSpots] = useState([]);  // Changed to spots

  return (
    
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <h1 className="text-center">CySpots</h1> {/* Changed heading */}
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <div className="text-center">
                  <h2>Welcome to CySpots!</h2>
                  <p>Your go-to platform for discovering cool spots around Iowa State University. Explore, add, and update your favorite spots!</p>
                </div>
              }
            />
            {/* Spots Page */}
            <Route
              path="/spots"  // Updated path to /spots
              element={<Spots spots={spots} setSpots={setSpots} />} // Pass spots to the Spots component
            />
            <Route
              path="/add-spot"  // Updated route path to /add-spot
              element={<AddSpot />}  // Use AddSpot for adding spots
            />
            <Route path="/admin" element={<Admin />} /> {/* New route for Admin */}
            <Route path="/spot/:id" element={<SpotDetail />} /> {/* Route for individual spot */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
