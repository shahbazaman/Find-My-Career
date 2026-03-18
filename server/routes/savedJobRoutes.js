import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  saveJob,
  getSavedJobs,
  unsaveJob   // ← add this
} from "../controllers/savedJobController.js";

const router = express.Router();

router.post("/:jobId", protect, saveJob);
router.get("/", protect, getSavedJobs);
router.delete("/:jobId", protect, unsaveJob);  // ← add this

export default router;