import Interview from "../models/Interview.js";
import axios from "axios";

/* =========================================================
   INTERVIEW CONTROLLER – BREVO HTTP API (RENDER SAFE)
========================================================= */

console.log("🔥🔥🔥 EMAIL INTERVIEW CONTROLLER DEPLOYED 🔥🔥🔥");

/* ================= SAFETY CHECK ================= */
if (!process.env.BREVO_API_KEY) {
  console.error("❌ BREVO_API_KEY is MISSING");
}
if (!process.env.FROM_EMAIL) {
  console.error("❌ FROM_EMAIL is MISSING");
}

/* ================= SEND EMAIL VIA BREVO ================= */
const sendInterviewEmail = async ({
  to,
  name,
  companyName,
  jobTitle,
  interviewDate,
  interviewTime,
  mode,
  locationOrLink,
  notes
}) => {
  console.log("📧 Sending email to:", to);

  return axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: {
        name: companyName,
        email: process.env.FROM_EMAIL
      },
      to: [
        {
          email: to,
          name
        }
      ],
      subject: `Interview Invitation – ${jobTitle}`,
      htmlContent: `
        <p>Dear <strong>${name}</strong>,</p>

        <p>
          You are invited to an interview with
          <strong>${companyName}</strong> for the role of
          <strong>${jobTitle}</strong>.
        </p>

        <ul>
          <li><strong>Date:</strong> ${interviewDate}</li>
          <li><strong>Time:</strong> ${interviewTime}</li>
          <li><strong>Mode:</strong> ${mode}</li>
          <li>
            <strong>${mode === "Online" ? "Meeting Link" : "Location"}:</strong>
            ${locationOrLink}
          </li>
        </ul>

        ${notes ? `<p><strong>Notes:</strong><br/>${notes}</p>` : ""}

        <p>Best regards,<br/><strong>${companyName}</strong></p>
      `
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json"
      }
    }
  );
};

/* ================= CREATE INTERVIEW ================= */
export const createInterview = async (req, res) => {
  console.log("🔥🔥🔥 EMAIL CONTROLLER HIT 🔥🔥🔥");
  console.log("📦 REQUEST BODY:", req.body);

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

    /* ===== SAVE INTERVIEW ===== */
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

    /* ===== RESPOND IMMEDIATELY ===== */
    res.status(201).json({
      success: true,
      message: "🔥 EMAIL CONTROLLER ACTIVE 🔥",
      interviewId: interview._id
    });

    /* ===== SEND EMAILS (ASYNC) ===== */
    if (!Array.isArray(applicants)) {
      console.warn("⚠️ No applicants array received");
      return;
    }

    for (const c of applicants) {
      if (!c?.email) continue;

      sendInterviewEmail({
        to: c.email,
        name: c.name,
        companyName,
        jobTitle,
        interviewDate,
        interviewTime,
        mode,
        locationOrLink,
        notes
      })
        .then(() => {
          console.log("✅ Email sent to:", c.email);
        })
        .catch(err => {
          console.error(
            "❌ Email failed:",
            err.response?.data || err.message
          );
        });
    }
  } catch (error) {
    console.error("❌ INTERVIEW ERROR:", error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Interview creation failed"
      });
    }
  }
};
