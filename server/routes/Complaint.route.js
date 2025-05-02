const express = require("express");
const router = express.Router();
const { raiseComplaint, getComplaints } = require("../Service/Complaint.service");

// Route to raise a complaint
router.post("/raise", raiseComplaint);

// Route to get all complaints or a specific one by complaintId
router.get("/fetch", getComplaints);

module.exports = router;
