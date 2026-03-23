// ONLY change from what I gave before is the import line:

import express from "express";
import Preference from "../models/Preference.js";
import protect from "../middleware/authMiddleware.js";  // ✅ matches your project

const router = express.Router();

// POST /preferences/:userId — save or update preferences
router.post("/:userId", protect, async (req, res) => {
  try {
    const { userId } = req.params;
    const updated = await Preference.findOneAndUpdate(
      { userId },
      { ...req.body, userId },
      { upsert: true, new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.error("Save preference error:", err);
    res.status(500).json({ message: "Failed to save preferences" });
  }
});

// GET /preferences/:userId — fetch saved preferences
router.get("/:userId", protect, async (req, res) => {
  try {
    const pref = await Preference.findOne({ userId: req.params.userId });
    if (!pref) return res.status(404).json({ message: "No preferences found" });
    res.status(200).json(pref);
  } catch (err) {
    console.error("Get preference error:", err);
    res.status(500).json({ message: "Failed to fetch preferences" });
  }
});

export default router;