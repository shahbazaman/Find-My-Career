import express from "express";
import {
  createProfile,
  getProfileByUser,
  updateProfile
} from "../controllers/profileController.js";

const router = express.Router();

// POST create profile
router.post("/", createProfile);

// GET profile using userId
router.get("/:userId", getProfileByUser);

// PUT update profile
router.put("/:userId", updateProfile);

export default router;
