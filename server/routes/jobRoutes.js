import express from "express";
import protect from "../middleware/protect.js";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,getJobRoles
} from "../controllers/jobController.js";
import { reopenJob } from "../controllers/jobController.js";

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */
router.get("/", getJobs);
router.get("/roles", getJobRoles);
router.get("/:id", getJobById);
/* ================= RECRUITER ROUTES ================= */
router.post("/", protect, createJob);
router.get("/recruiter/my-jobs", protect, getMyJobs);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);
router.put("/admin/reopen/:id", protect, reopenJob);

export default router;
