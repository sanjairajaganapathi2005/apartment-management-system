const express = require("express");
const router = express.Router();
const {
  addTenant,
  getAllTenants,
  updateTenant,
  deleteTenant
} = require("../Service/Owner.service"); // ✅ Fixed path

// Add tenant
router.post("/createtenant", addTenant);

// Get all tenants
router.get("/tenants", getAllTenants);

// Update tenant
router.put("/updatetenant/:id", updateTenant);

// Delete tenant
router.delete("/deletetenant/:id", deleteTenant);

module.exports = router;
