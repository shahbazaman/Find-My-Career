import express from "express";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: "test@uaildeukar.resend.app",
      subject: "Resend Test Success",
      html: "<h1>Resend is working 🎉</h1>",
    });

    res.json({ success: true });
  } catch (err) {
    console.error("TEST EMAIL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
