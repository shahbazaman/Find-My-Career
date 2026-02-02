import express from "express";
import protect from "../middleware/protect.js";
import {
  applyForJob,
  updateApplicationStatus,
  getApplicantsByJob,
  getApplicationProfile,
  getApplicantsForRecruiter,
  updateInterviewNotes,
  getMyApplications ,
  getMyApplicationStats// ✅ ADD THIS
} from "../controllers/applicationController.js";


const router = express.Router();

router.post("/:jobId", protect, applyForJob);
router.get("/job/:jobId", protect, getApplicantsByJob);
router.put("/:id/status", protect, updateApplicationStatus);
router.get("/:id/profile", protect, getApplicationProfile);
router.put("/:id/notes", protect, updateInterviewNotes);
router.get("/my", protect, getMyApplications);
router.get("/recruiter/applicants", protect, getApplicantsForRecruiter);
router.get("/my/stats", protect, getMyApplicationStats);

export default router;
