const Complaint = require("../models/Complaint.model");

// POST /api/complaint/raise
const raiseComplaint = async (req, res) => {
  try {
    const { description, blockNo, roomNo, raisedBy } = req.body;

    if (!description || !blockNo || !roomNo || !raisedBy) {
      return res.status(400).json({
        error: "All fields are required: description, blockNo, roomNo, and raisedBy"
      });
    }

    const newComplaint = new Complaint({
      description,
      blockNo,
      roomNo,
      raisedBy
    });

    await newComplaint.save();

    res.status(200).json({
      message: "Complaint registered successfully",
      complaint: newComplaint
    });
  } catch (err) {
    console.error("Error while raising complaint:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getComplaints = async (req, res) => {
  try {
    const { complaintId } = req.query;

    if (complaintId) {
      const complaint = await Complaint.findById(complaintId);
      if (!complaint) {
        return res.status(404).json({ error: "Complaint not found" });
      }
      return res.status(200).json(complaint);
    }

    const complaints = await Complaint.find().sort({ date: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    console.error("Error while fetching complaints:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { raiseComplaint, getComplaints };
