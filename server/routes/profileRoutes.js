import express from "express";
import {
  createProfile,
  getProfileByUser,
  updateProfile,
  clearResumeController // ✅ ADD THIS IMPORT
} from "../controllers/profileController.js";

const router = express.Router();

router.post("/", createProfile);
router.get("/:userId", getProfileByUser);
router.put("/:userId", updateProfile);
router.post("/:userId/clear-resume", clearResumeController); // ✅ Now it has a reference

export default router;