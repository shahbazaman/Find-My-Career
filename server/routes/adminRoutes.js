import express from "express";
import User from "../models/User.js";
import adminProtect from "../middleware/adminProtect.js";

const router = express.Router();

/* ✅ Get all pending recruiters (ADMIN ONLY) */
router.get("/recruiters/pending", adminProtect, async (req, res) => {
  try {
    const users = await User.find({
      role: "recruiters",
      approvalStatus: "pending"
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/recruiters/all", adminProtect, async (req, res) => {
  try {
    const users = await User.find({
      role: "recruiters"
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ✅ Approve recruiter */
router.put("/recruiters/approve/:id", adminProtect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      approvalStatus: "approved"
    });

    res.json({ message: "Recruiter approved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ❌ Reject recruiter */
router.put("/recruiters/reject/:id", adminProtect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      approvalStatus: "rejected"
    });

    res.json({ message: "Recruiter rejected" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/* ✅ Get all job seekers (ADMIN ONLY) */
router.get("/jobseekers", adminProtect, async (req, res) => {
  try {
    const users = await User.find({
      role: "job seekers"   // ✅ EXACT MATCH FROM MODEL
    }).select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
