import express from "express";
import {
  upsertCompanyProfile,
  getMyCompanyProfile
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

export default router;
