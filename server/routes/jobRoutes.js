import express from "express";
import protect from "../middleware/protect.js";
import adminProtect from "../middleware/adminProtect.js";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
  getJobRoles,
  reopenJob,
  adminDeleteJob,
  adminUpdateJob
} from "../controllers/jobController.js";

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

/* ================= ADMIN ROUTES ================= */
router.delete("/admin/:id", adminProtect, adminDeleteJob);
router.put("/admin/:id", adminProtect, adminUpdateJob);

export default router;