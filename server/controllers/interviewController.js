import Interview from "../models/Interview.js";
import axios from "axios";

console.log("🟣 [BACKEND] interviewController loaded");
if (!process.env.BREVO_API_KEY) {
  console.error("❌ BREVO_API_KEY is MISSING");
}

if (!process.env.FROM_EMAIL) {
  console.error("❌ FROM_EMAIL is MISSING");
}

/* ===================== SEND EMAIL VIA BREVO API ===================== */
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
  return axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: {
        name: companyName,
        email: process.env.FROM_EMAIL
      },
      to: [{ email: to, name }],
      subject: `Interview Invitation – ${jobTitle}`,
      htmlContent: `
        <p>Dear <b>${name}</b>,</p>
        <p>You are invited to an interview with <b>${companyName}</b>.</p>
        <ul>
          <li><b>Date:</b> ${interviewDate}</li>
          <li><b>Time:</b> ${interviewTime}</li>
          <li><b>Mode:</b> ${mode}</li>
          <li><b>${mode === "Online" ? "Meeting Link" : "Location"}:</b> ${locationOrLink}</li>
        </ul>
        ${notes ? `<p><b>Notes:</b> ${notes}</p>` : ""}
        <p>Best regards,<br/>${companyName}</p>
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

/* ===================== CREATE INTERVIEW ===================== */
export const createInterview = async (req, res) => {
  console.log("🟣 [BACKEND] /api/interviews HIT");
  console.log("🟣 [BACKEND] Body:", req.body);

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

    res.status(201).json({
      message: "Interview scheduled. Emails are being sent.",
      interview
    });

    if (!Array.isArray(applicants)) return;

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
          console.log("🟢 [BACKEND] Email sent to:", c.email);
        })
        .catch(err => {
          console.error(
            "🔴 [BACKEND] Email failed:",
            c.email,
            err.response?.data || err.message
          );
        });
    }
  } catch (err) {
    console.error("🔴 [BACKEND] Error:", err);
    if (!res.headersSent) {
      res.status(500).json({ message: "Interview failed" });
    }
  }
};
