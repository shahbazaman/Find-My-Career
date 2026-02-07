import Interview from "../models/Interview.js";
import Application from "../models/Application.js";
import Notification from "../models/notificationModel.js";
import sendEmail from "../utils/sendEmail.js";

/**
 * POST /api/interviews
 * Bulk schedule interviews + send emails
 */
export const createInterviews = async (req, res) => {
  try {
    /* ================= AUTH ================= */
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const recruiterId = req.user.id;

    /* ================= BODY ================= */
    const {
      applicationIds,
      companyName,
      jobTitle,
      interviewDate,
      interviewTime,
      mode,
      locationOrLink,
      notes,
    } = req.body;

    /* ================= VALIDATION ================= */
    if (!Array.isArray(applicationIds) || applicationIds.length === 0) {
      return res.status(400).json({ message: "No applications selected" });
    }

    if (!interviewDate || !interviewTime || !mode || !locationOrLink) {
      return res.status(400).json({
        message: "Missing required interview details",
      });
    }

    /* ================= FETCH APPLICATIONS ================= */
    const applications = await Application.find({
      _id: { $in: applicationIds },
    }).populate("user", "email firstName lastName");

    if (!applications.length) {
      return res.status(404).json({ message: "Applications not found" });
    }

    /* ================= CREATE INTERVIEWS ================= */
    const interviewsToCreate = applications.map((app) => ({
      applicationId: app._id,
      userId: app.user._id,
      jobTitle,
      companyName,
      interviewDate,
      interviewTime,
      mode,
      locationOrLink,
      notes,
      createdBy: recruiterId,
    }));

    await Interview.insertMany(interviewsToCreate);

    /* ================= UPDATE APPLICATION STATUS ================= */
    await Application.updateMany(
      { _id: { $in: applicationIds } },
      { $set: { status: "Interview Scheduled" } }
    );

    /* ================= EMAILS + NOTIFICATIONS ================= */
    for (const app of applications) {
      const candidateName =
        `${app.user.firstName || ""} ${app.user.lastName || ""}`.trim();

      console.log("📨 Sending interview email for:", app.user.email);

      const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6">
          <h2>Interview Scheduled</h2>
          <p>Dear ${candidateName || "Candidate"},</p>
          <p>
            Your interview for <strong>${jobTitle}</strong> at
            <strong>${companyName}</strong> has been scheduled.
          </p>
          <p>
            <strong>Date:</strong> ${interviewDate}<br/>
            <strong>Time:</strong> ${interviewTime}<br/>
            <strong>Mode:</strong> ${mode}<br/>
            <strong>Location / Link:</strong> ${locationOrLink}
          </p>
          ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
          <p>— FindMyCareer Team</p>
        </div>
      `;

      // 🚨 MUST AWAIT FOR DEBUGGING
      await sendEmail({
        to: app.user.email,
        subject: `Interview Scheduled – ${jobTitle}`,
        html,
      });

      await Notification.create({
        user: app.user._id,
        title: "Interview Scheduled",
        label: `Interview for ${jobTitle} on ${interviewDate}`,
        type: "meeting",
      });
    }

    /* ================= RESPONSE ================= */
    return res.status(201).json({
      success: true,
      message: "Interviews scheduled successfully",
      count: interviewsToCreate.length,
    });
  } catch (error) {
    console.error("❌ CREATE_INTERVIEW_ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to schedule interview",
      error: error.message,
    });
  }
};
