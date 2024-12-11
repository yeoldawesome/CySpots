const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "cyspots",
});

// Multer storage configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.post("/spots", upload.single("image"), (req, res) => {
  const { spot_name, location, description } = req.body;
  const image_url = req.file ? "/uploads/" + req.file.filename : null;

  if (!spot_name || !location || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.query(
    "INSERT INTO spots (spot_name, location, description, image_url) VALUES (?, ?, ?, ?)",
    [spot_name, location, description, image_url],
    (err, result) => {
      if (err) {
        console.error("Error inserting spot:", err);
        return res.status(500).json({ error: "Error inserting spot" });
      }
      res.status(201).json({ message: "Spot added successfully!" });
    }
  );
});

app.get("/spots", (req, res) => {
  db.query("SELECT * FROM spots", (err, result) => {
    if (err) {
      console.error("Error reading all spots:", err);
      return res.status(500).send({ error: "Error reading all spots" });
    }
    res.status(200).send(result);
  });
});

app.get("/spots/:id", (req, res) => {
  const spotsId = req.params.id;

  db.query("SELECT * FROM spots WHERE id = ?", [spotsId], (err, result) => {
    if (err) {
      console.error("Error fetching spot:", err);
      return res.status(500).send({ error: "Error fetching spot" });
    }

    if (result.length === 0) {
      return res.status(404).send({ error: "Spot not found" });
    }

    res.status(200).send(result[0]);
  });
});

app.put("/spots/:id", upload.single("image"), (req, res) => {
  const spotsId = req.params.id;
  const { spot_name, location, description } = req.body;
  const image_url = req.file ? "/uploads/" + req.file.filename : null;

  console.log("Updating spot with ID:", spotsId);
  console.log("Received data:", spot_name, location, description, image_url);

  db.query("SELECT * FROM spots WHERE id = ?", [spotsId], (err, result) => {
    if (err) {
      console.error("Error finding spot:", err);
      return res.status(500).send({ error: "Error finding spot", details: err.message });
    }

    if (result.length === 0) {
      console.error("Spot not found");
      return res.status(404).send({ error: "Spot not found" });
    }

    const updatedImageUrl = image_url || result[0].image_url;

    db.query(
      "UPDATE spots SET spot_name = ?, location = ?, description = ?, image_url = ? WHERE id = ?",
      [spot_name, location, description, updatedImageUrl, spotsId],
      (err, result) => {
        if (err) {
          console.error("Error updating spot:", err);
          return res.status(500).send({ error: "Error updating spot", details: err.message });
        }
        console.log("Spot updated successfully:", result);
        res.status(200).send({ message: "Spot updated successfully", result });
      }
    );
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "Username and password are required." });
  }
  const query = "SELECT role FROM users WHERE username = ? AND password = ?";

  try {
    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error("Database error during login:", err);
        return res
          .status(500)
          .send({ error: "An error occurred in Query. Please try again." });
      }
      if (results.length === 0) {
        return res.status(401).send({ error: "Invalid username or password." });
      }
      const { role } = results[0];
      res.status(200).send({ role });
    });
  } catch (err) {
    console.error("Error in GET /login", err);
    res
      .status(500)
      .send({ error: "An unexpected error occurred in Login: " + err.message });
  }
});

app.delete("/spots/:id", (req, res) => {
  const spotsId = req.params.id;

  db.query("DELETE FROM spots WHERE id = ?", [spotsId], (err, result) => {
    if (err) {
      console.error("Error deleting spot:", err);
      return res.status(500).send({ error: "Error deleting spot" });
    }
    res.status(200).send({ message: "Spot deleted successfully", result });
  });
});

const port = 8081;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
