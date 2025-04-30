const express = require('express');
const cors = require('cors');
require('dotenv').config();

// MongoDB connection
const connectDb = require('./Config/db.config');

// Routes
const ownerRoutes = require('./routes/Owner.route');
const complaintRoutes = require('./routes/Complaint.route'); // Complaint routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Use built-in JSON parser instead of body-parser

// Connect to MongoDB
connectDb();

// API Routes
app.use("/api/owner", ownerRoutes);
app.use("/api/complaint", complaintRoutes); // Complaint API route

// Default Route
app.get("/", (req, res) => {
  res.send("Apartment Management Server is running.");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
