import React, { useState } from "react";

const Authentication = ({ setUserRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/spots/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        return;
      }
      const { role } = await response.json();
      setUserRole(role);
    } catch (err) {
      console.log("Failed to log in. Please try again." + err);
      setError("Failed to log in. Please try again. " + err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Login</h2>
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
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};
export default Authentication;

return (
  <div className="container mt-4">
    <h2 className="text-center">Login</h2>
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
      {error && <p className="text-danger">{error}</p>}
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  </div>
);
};
export default Authentication;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Sidebar from "./SideBar";
// import AddSpot from "./AddSpots"; // Import AddSpot (renamed)
// import Spots from "./Spots"; // Import Spots instead of Contacts
// import Admin from "./Admin"; // Import Admin component
// import SpotDetail from "./SpotDetail"; // Import SpotDetail

// import Authentication from "./Login";

// function App() {
// const [spots, setSpots] = useState([]); // Changed to spots
// const [userRole, setUserRole] = useState(null);
// return (
//   <div className="App">
//     {userRole ? (
//       <Router>
//         <div className="d-flex">
//         {<Sidebar userRole={userRole} />}

          
//           <div className="flex-grow-1 p-3">
//             <h1 className="text-center">CySpots</h1> {/* Changed heading */}
//             <Routes>
//               {/* Home Page */}
//               <Route
//                 path="/"
//                 element={
//                   <div className="text-center">
//                     <h2>Welcome to CySpots!</h2>
//                     <p>
//                       Your go-to platform for discovering cool spots around
//                       Iowa State University. Explore, add, and update your
//                       favorite spots!
//                     </p>
//                   </div>
//                 }
//               />
//               {/* Spots Page */}
//               <Route
//                 path="/spots" // Updated path to /spots
//                 element={<Spots spots={spots} setSpots={setSpots} />} // Pass spots to the Spots component
//               />
//               <Route
//                 path="/add-spot" // Updated route path to /add-spot
//                 element={<AddSpot />} // Use AddSpot for adding spots
//               />
//               <Route path="/spot/:id" element={<SpotDetail />} />{" "}
//               {/* Route for individual spot */}
//               {userRole === "admin" && (
//                 <>
//                   <Route path="/admin" element={<Admin />} />{" "}
//                   {/* New route for Admin */}
//                 </>
//               )}
//             </Routes>
//           </div>
//         </div>
//       </Router>
//     ) : (
//       <Authentication setUserRole={setUserRole} />
//     )}
//   </div>
// );
// }

// export default App;
