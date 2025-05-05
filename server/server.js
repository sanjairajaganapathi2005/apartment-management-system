const express = require("express");
const cors = require("cors");
require("dotenv").config();

// MongoDB connection
const connectDb = require("./Config/db.config");

const owner = require('./routes/owner.routes');
const complaint = require('./routes/Complaint.routes');
const admin = require('./routes/Admin.routes');
const authRoutes = require('./routes/Auth.routes');
const employee = require('./routes/Employee.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDb();

// Routes
app.use('/admin', admin);
app.use('/auth', authRoutes);
app.use('/complaint', complaint);
app.use('/employee', employee);
app.use('/owner', owner);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Default Route
app.get("/", (req, res) => {
  res.send("Apartment Management Server is running.");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
