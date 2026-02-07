import Interview from "../models/Interview.js";
import nodemailer from "nodemailer";

console.log("🟣 [BACKEND] interviewController loaded");

/* ================= SMTP TRANSPORT ================= */
console.log("🟣 [BACKEND] SMTP ENV CHECK", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER ? "SET" : "MISSING",
  pass: process.env.SMTP_PASS ? "SET" : "MISSING",
  from: process.env.FROM_EMAIL
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
});

/* ================= SMTP VERIFY ================= */
transporter.verify((err) => {
  if (err) {
    console.error("🔴 [BACKEND] SMTP VERIFY FAILED:", err);
  } else {
    console.log("🟢 [BACKEND] SMTP READY");
  }
});

/* ================= CONTROLLER ================= */
export const createInterview = async (req, res) => {
  console.log("🟣 [BACKEND] /api/interviews HIT");
  console.log("🟣 [BACKEND] Request body:", req.body);

  try {
    const {
      applicationIds,
      applicants,
      companyName,
      jobTitle,
      interviewDate,
      interviewTime,
      mode,
      locationOrLink,
      notes
    } = req.body;

    console.log("🟣 [BACKEND] Saving interview...");

    const interview = await Interview.create({
      applicationIds,
      companyName,
      jobTitle,
      interviewDate,
      interviewTime,
      mode,
      locationOrLink,
      notes
    });

    console.log("🟢 [BACKEND] Interview saved:", interview._id);

    // Respond immediately
    res.status(201).json({
      message: "Interview scheduled (email sending in background)",
      interview
    });

    if (!Array.isArray(applicants)) {
      console.warn("🟡 [BACKEND] No applicants array");
      return;
    }

    for (const candidate of applicants) {
      console.log("🟣 [BACKEND] Sending email to:", candidate.email);

      transporter
        .sendMail({
          from: `"${companyName}" <${process.env.FROM_EMAIL}>`,
          to: candidate.email,
          subject: `Interview Invitation – ${jobTitle}`,
          html: `
            <p>Hello ${candidate.name},</p>
            <p>Your interview for <b>${jobTitle}</b> is scheduled.</p>
            <p>Date: ${interviewDate}</p>
            <p>Time: ${interviewTime}</p>
            <p>${mode}: ${locationOrLink}</p>
          `
        })
        .then(() => {
          console.log("🟢 [BACKEND] Email sent to:", candidate.email);
        })
        .catch(err => {
          console.error(
            "🔴 [BACKEND] Email failed for:",
            candidate.email,
            err.message
          );
        });
    }
  } catch (error) {
    console.error("🔴 [BACKEND] Controller error:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Interview creation failed" });
    }
  }
};
