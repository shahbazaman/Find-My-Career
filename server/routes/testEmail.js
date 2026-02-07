import express from "express";
import { Resend } from "resend";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.get("/resend", async (req, res) => {
  try {
    console.log("📨 Sending test email...");

    const { data, error } = await resend.emails.send({
      from: "FindMyCareer <onboarding@resend.dev>",
      to: ["test@uaildeukar.resend.app"],
      subject: "Resend works from Render ✅",
      html: "<h1>🎉 Email sent successfully!</h1>",
    });

    if (error) {
      console.error("❌ RESEND ERROR:", error);
      return res.status(400).json({ error });
    }

    console.log("✅ EMAIL SENT:", data.id);
    res.json({ success: true, id: data.id });
  } catch (err) {
    console.error("❌ SERVER ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
