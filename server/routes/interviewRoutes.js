import express from "express";
import { createInterviews } from "../controllers/interviewController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/interviews
router.post("/", protect, createInterviews);

export default router;
