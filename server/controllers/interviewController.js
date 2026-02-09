import Interview from "../models/Interview.js";
import axios from "axios";

console.log("🔥 EMAIL INTERVIEW CONTROLLER ACTIVE (BREVO ONLY)");

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
      to: [{ email: to, name }],
      subject: `Interview Invitation – ${jobTitle}`,
      htmlContent: `
        <p>Dear <b>${name}</b>,</p>
        <p>You are invited for an interview with <b>${companyName}</b>.</p>

        <ul>
          <li><b>Date:</b> ${interviewDate}</li>
          <li><b>Time:</b> ${interviewTime}</li>
          <li><b>Mode:</b> ${mode}</li>
          <li><b>${mode === "Online" ? "Meeting Link" : "Location"}:</b> ${locationOrLink}</li>
        </ul>

        ${notes ? `<p><b>Notes:</b> ${notes}</p>` : ""}

        <p>Regards,<br/>${companyName}</p>
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
  console.log("🔥 /api/interviews HIT");
  console.log("📦 BODY:", req.body);

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

    if (!Array.isArray(applicants) || !applicants.length) {
      return res.status(400).json({
        success: false,
        message: "No applicants provided"
      });
    }

    // Respond immediately (don’t block UI)
    res.status(201).json({
      success: true,
      message: "Interview scheduled & emails triggered"
    });

    // One interview per applicant (schema-safe)
    for (let i = 0; i < applicants.length; i++) {
      const applicant = applicants[i];

      await Interview.create({
        applicationId: applicationIds[i], // ✅ required
        userId: applicant.userId,          // ✅ required
        createdBy: req.user.id,             // ✅ recruiter
        jobTitle,
        companyName,
        interviewDate,
        interviewTime,
        mode,
        locationOrLink,
        notes
      });

      sendInterviewEmail({
        to: applicant.email,
        name: applicant.name,
        companyName,
        jobTitle,
        interviewDate,
        interviewTime,
        mode,
        locationOrLink,
        notes
      })
        .then(() => console.log("✅ Email sent:", applicant.email))
        .catch(err =>
          console.error("❌ Email failed:", err.response?.data || err.message)
        );
    }
  } catch (error) {
    console.error("❌ INTERVIEW ERROR:", error.message);
  }
};
