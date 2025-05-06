const express = require("express");
const cors = require("cors");
require("dotenv").config();

// MongoDB connection
const connectDb = require("./Config/db.config");

// Routes
const ownerRoutes = require('./routes/Owner.route');
const complaintRoutes = require('./routes/Complaint.route');
const authRoutes = require('./routes/Auth.route'); // ✅ Auth route added

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.json());

// Connect to MongoDB
connectDb();

// API Routes
app.use("/api/owner", ownerRoutes);
app.use("/api/complaint", complaintRoutes);
app.use("/api/auth", authRoutes); // ✅ Auth route registered

// Default Route
app.get("/", (req, res) => {
  res.send("🏢 Apartment Management Server is running.");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
