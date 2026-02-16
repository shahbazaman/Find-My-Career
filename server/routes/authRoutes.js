import express from "express";
import {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
  googleLogin
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import { setPassword } from "../controllers/authController.js";
const router = express.Router();

/* ================= AUTH ================= */
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
/* ================= PASSWORD RESET ================= */
router.post("/password-reset", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);
router.post("/set-password", protect, setPassword);
export default router;
