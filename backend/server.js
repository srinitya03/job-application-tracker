const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Check if MONGO_URI is loaded
console.log("MONGO_URI:", process.env.MONGO_URI);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/jobtracker")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// Routes
const jobRoutes = require("./routes/jobRoutes");
app.use("/jobs", jobRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});