const express = require("express");
const app = express();
app.use(express.json());

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

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port", PORT));
