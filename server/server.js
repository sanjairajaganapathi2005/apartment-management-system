// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// Load environment variables
dotenv.config();

// Routes
const ownerRoutes = require("./routes/Owner.route");
const employeeRoutes = require("./routes/Employee.route");

const app = express();
const PORT = process.env.PORT || 5555;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL + "apartment", {
    // Use MONGODB_URL instead
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/owner", ownerRoutes);
app.use("/employee", employeeRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error Middleware:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
