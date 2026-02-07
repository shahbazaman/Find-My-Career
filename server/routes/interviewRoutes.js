import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createInterview } from "../controllers/interviewController.js";

const router = express.Router();

/**
 * Create interview + send interview emails
 */
router.post("/", protect, createInterview);

export default router;
