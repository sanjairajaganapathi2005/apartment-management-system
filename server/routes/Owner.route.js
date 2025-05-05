// routes/Owner.route.js

const express = require("express");
const router = express.Router();
const { createTenantByOwner } = require("../Services/Owner.service");

router.post("/createtenant", createTenantByOwner);

module.exports = router;