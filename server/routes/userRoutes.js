import express from "express";
import {
  getUserById,
  updateName,
  updateContact,
  deleteAccount,
  createUser
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import adminProtect from "../middleware/adminProtect.js";
const router = express.Router();

/* ===================== GET USER BY ID ===================== */
router.get("/:id", getUserById);
router.post("/create", adminProtect, createUser);
/* ===================== UPDATE NAME ===================== */
router.put("/update-name", protect, updateName);
router.put("/update-contact", protect, updateContact);
router.delete("/delete", protect, deleteAccount);
// router.put("/logo", protect, uploadLogo);
export default router;





