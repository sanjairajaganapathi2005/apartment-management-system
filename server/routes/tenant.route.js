const express = require("express");
const router = express.Router();
const { createTenantByOwner, getAllTenants, updateTenant, deleteTenant } = require("../Services/Tenant.service");

router.post("/createtenant", createTenantByOwner);

router.get("/", getAllTenants);

router.put("/updatetenant/:id", updateTenant);

router.delete("/deletetenant/:id", deleteTenant);

module.exports = router;
