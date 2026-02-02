import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  saveJob,
  getSavedJobs
} from "../controllers/savedJobController.js";

const router = express.Router();

router.post("/:jobId", protect, saveJob);
router.get("/", protect, getSavedJobs);

export default router;
