// routes/courseProgress.js
import express from "express";
import CourseProgress from "../models/CourseProgress.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Save/update page completion
router.post("/:courseKey", protect, async (req, res) => {
  try {
    const { courseKey } = req.params;
    const { pageNumber, totalPages } = req.body;
    const userId = req.user._id;

    const doc = await CourseProgress.findOneAndUpdate(
      { userId, courseKey },
      {
        $addToSet: { completedPages: pageNumber }, // no duplicates
        totalPages,
        userId,
        courseKey
      },
      { upsert: true, new: true }
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: "Failed to save progress" });
  }
});

// Get all course progress for a user
router.get("/", protect, async (req, res) => {
  try {
    const records = await CourseProgress.find({ userId: req.user._id });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch progress" });
  }
});

export default router;