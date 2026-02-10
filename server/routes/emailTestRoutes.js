import express from "express";
import { sendTestEmail } from "../controllers/emailTestController.js";

const router = express.Router();

router.post("/email/test", sendTestEmail);

export default router;
