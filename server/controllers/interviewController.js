import Interview from "../models/Interview.js";
import sgMail from "@sendgrid/mail";

console.log("🔥 SENDGRID INTERVIEW CONTROLLER ACTIVE");

/* ================= SENDGRID CONFIG ================= */
if (!process.env.SENDGRID_API_KEY) {
  console.error("❌ SENDGRID_API_KEY is missing in environment variables");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/* ================= SEND EMAIL FUNCTION ================= */
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
  if (!process.env.SENDGRID_VERIFIED_EMAIL) {
    throw new Error("SENDGRID_VERIFIED_EMAIL is not set in environment variables");
  }

  const msg = {
    to,
    from: {
      email: process.env.SENDGRID_VERIFIED_EMAIL, // MUST be verified in SendGrid
      name: "FindMyCareer"
    },
    subject: `Interview Invitation – ${jobTitle}`,
    html: `
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
  };

  await sgMail.send(msg);
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

    if (!Array.isArray(applicants) || applicants.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No applicants provided"
      });
    }

    if (!Array.isArray(applicationIds) || applicationIds.length !== applicants.length) {
      return res.status(400).json({
        success: false,
        message: "Application IDs mismatch"
      });
    }

    let successCount = 0;
    const failedEmails = [];

    /* ===== STRICT AWAIT LOOP ===== */
    for (let i = 0; i < applicants.length; i++) {
      const applicant = applicants[i];
      const applicationId = applicationIds[i];

      try {
        /* 1️⃣ Save interview (schema safe) */
        await Interview.create({
          applicationId,
          userId: applicant.userId,
          createdBy: req.user.id,
          jobTitle,
          companyName,
          interviewDate,
          interviewTime,
          mode,
          locationOrLink,
          notes
        });

        /* 2️⃣ Send email (WAIT here) */
        await sendInterviewEmail({
          to: applicant.email,
          name: applicant.name,
          companyName,
          jobTitle,
          interviewDate,
          interviewTime,
          mode,
          locationOrLink,
          notes
        });

        console.log("✅ Email sent to:", applicant.email);
        successCount++;

      } catch (err) {
        console.error(
          "❌ Failed for:",
          applicant.email,
          err.response?.body || err.message
        );
        failedEmails.push(applicant.email);
      }
    }

    /* ===== FINAL RESPONSE AFTER LOOP ===== */
    return res.status(201).json({
      success: true,
      message: `Interviews processed. Success: ${successCount}, Failed: ${failedEmails.length}`,
      failedEmails
    });

  } catch (error) {
    console.error("❌ INTERVIEW ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Interview scheduling failed"
    });
  }
};
