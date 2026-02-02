import express from "express";
import protect from "../middleware/protect.js";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  getMyCompany,
  updateCompany,
  deleteCompany
} from "../controllers/companyController.js";

const router = express.Router();

/* RECRUITER */
router.get("/me/profile", protect, getMyCompany);
router.put("/me/profile", protect, updateCompany);
router.delete("/me/profile", protect, deleteCompany);

/* PUBLIC */
router.get("/", getCompanies);
router.get("/:id", getCompanyById);

export default router;
