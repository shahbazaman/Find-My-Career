import express from "express";
import protect from "../middleware/authMiddleware.js";
import { sendTestEmail } from "../controllers/emailTestController.js";

const router = express.Router();

router.post("/email/test", protect, sendTestEmail);

export default router;
