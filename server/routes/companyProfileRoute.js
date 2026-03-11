import express from "express";
import {
  upsertCompanyProfile,
  getMyCompanyProfile,
  getCompanyProfileByUserId
} from "../controllers/companyProfileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE OR UPDATE COMPANY PROFILE */
router.post(
  "/me/profile",
  authMiddleware,
  upsertCompanyProfile
);

/* GET LOGGED-IN COMPANY PROFILE */
router.get(
  "/me/profile",
  authMiddleware,
  getMyCompanyProfile
);

/* GET COMPANY PROFILE BY USER ID — PUBLIC (no auth needed) */
router.get(
  "/user/:userId",
  getCompanyProfileByUserId
);

export default router;