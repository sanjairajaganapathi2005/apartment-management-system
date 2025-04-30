// routes/Owner.route.js

const express = require("express");
const router = express.Router();
const { createTenantByOwner } = require("../Service/Owner.service");

router.post("/createtenant", createTenantByOwner);

module.exports = router;