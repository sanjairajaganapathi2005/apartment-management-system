const express = require("express");
const cors = require("cors");
require("dotenv").config();

// MongoDB connection
const connectDb = require("./Config/db.config");

// Routes
const tenantRoutes = require('./routes/Tenant.route');
const complaintRoutes = require('./routes/Complaint.route');
const authRoutes = require('./routes/Auth.route'); 
const employeeRoutes = require('./routes/Employee.route'); 
const userRouter = require('./routes/User.route');
const adminRoutes = require('./routes/Admin.route');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDb();

// API Routes
app.use("/tentent", tenantRoutes);
app.use("/complaint", complaintRoutes);
app.use("/auth", authRoutes); 
app.use("/employee", employeeRoutes); 
app.use("/auth", userRouter); 
app.use("/admin", adminRoutes);


// Default Route
app.get("/", (req, res) => {
  res.send("🏢 Apartment Management Server is running.");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
