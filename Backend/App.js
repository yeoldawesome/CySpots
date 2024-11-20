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


app.get("/spots", (req, res) => {
  db.query("SELECT * FROM spots", (err, result) => {
    if (err) {
      console.error("Error reading all spots:", err);
      return res.status(500).send({ error: "Error reading all spots" });
    }
    res.status(200).send(result);
  });
});

app.post("/spots", upload.single("image"), (req, res) => {
  const { spots_name, location, description } = req.body;
  const image_url = req.file ? "/uploads/" + req.file.filename : null; // Save image URL if an image is uploaded

  db.query(
    "INSERT INTO spots (spots_name, location, description, image_url) VALUES (?, ?, ?, ?)",
    [spots_name, location, description, image_url],
    (err, result) => {
      if (err) {
        console.error("Error adding spot:", err);
        return res.status(500).send({ error: "Error adding spots" });
      }
      res.status(201).send({ message: "spots added successfully", result });
    }
  );
});

app.put("/spots/:id", upload.single("image"), (req, res) => {
  const spotsId = req.params.id;
  const { spots_name, location, description } = req.body;
  const image_url = req.file ? "/uploads/" + req.file.filename : null;

  db.query(
    "UPDATE spots SET spots_name = ?, location = ?, description = ?, image_url = ? WHERE id = ?",
    [spots_name, location, description, image_url, spotsId],
    (err, result) => {
      if (err) {
        console.error("Error updating spots:", err);
        return res.status(500).send({ error: "Error updating spots" });
      }
      res.status(200).send({ message: "spots updated successfully", result });
    }
  );
});

app.delete("/spots/:id", (req, res) => {
  const spotsId = req.params.id;

  db.query("DELETE FROM spots WHERE id = ?", [spotsId], (err, result) => {
    if (err) {
      console.error("Error deleting spots:", err);
      return res.status(500).send({ error: "Error deleting spots" });
    }
    res.status(200).send({ message: "spots deleted successfully", result });
  });
});

const port = 8081;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
