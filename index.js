const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());

// Serve static files from public
app.use(express.static(path.join(__dirname, "public")));

// Stores the latest reading from the ESP32
let latestData = {
  temperature: null,
  humidity: null,
  fan: null
};

// ESP32 sends data here
app.post("/api/data", (req, res) => {
  latestData = req.body;
  console.log("Received:", latestData);
  res.send("Data stored");
});

// Website gets real-time data here
app.get("/api/data", (req, res) => {
  res.json(latestData);
});

// Fallback for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port", PORT));
