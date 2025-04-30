// routes/Owner.route.js

const express = require("express");
const router = express.Router();
const { createTenantByOwner } = require("../controllers/Owner.server");

// Route to create a new tenant by owner
router.post("/createtenant", createTenantByOwner);

module.exports = router;
