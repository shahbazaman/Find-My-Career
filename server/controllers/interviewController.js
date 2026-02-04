import Interview from "../models/Interview.js";
import Application from "../models/Application.js";
import Notification from "../models/notificationModel.js";
import sendEmail from "../utils/sendEmail.js";

/**
 * POST /api/interviews
 * Create interviews, update application status,
 * send emails, and create notifications.
 */
export const createInterviews = async (req, res) => {
  try {
    /* ================= AUTH ================= */
    // JWT payload contains: { id, role }
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
      notes
    } = req.body;

    /* ================= VALIDATION ================= */
    if (!Array.isArray(applicationIds) || applicationIds.length === 0) {
      return res.status(400).json({ message: "No applications selected" });
    }

    if (!interviewDate || !interviewTime || !mode || !locationOrLink) {
      return res.status(400).json({
        message: "Missing required interview details"
      });
    }

    /* ================= FETCH APPLICATIONS ================= */
    const applications = await Application.find({
      _id: { $in: applicationIds }
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
      createdBy: recruiterId
    }));

    await Interview.insertMany(interviewsToCreate);

    /* ================= UPDATE APPLICATION STATUS ================= */
    await Application.updateMany(
      { _id: { $in: applicationIds } },
      { $set: { status: "Interview Scheduled" } }
    );

    /* ================= EMAILS + NOTIFICATIONS ================= */
    const tasks = applications.map(async (app) => {
      try {
        const candidateName = `${app.user.firstName || ""} ${app.user.lastName || ""}`.trim();
        const locationLabel = mode === "Online" ? "Meeting Link" : "Office Location";

        /* ---------- EMAIL ---------- */
        if (app.user.email) {
          await sendEmail({
            to: app.user.email,
            subject: `Interview Scheduled - ${jobTitle}`,
            html: `
              <p>Dear <strong>${candidateName || "Candidate"}</strong>,</p>
              <p>Your interview for <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been scheduled.</p>
              <p><strong>Date:</strong> ${interviewDate}</p>
              <p><strong>Time:</strong> ${interviewTime}</p>
              <p><strong>Mode:</strong> ${mode}</p>
              <p><strong>${locationLabel}:</strong> ${locationOrLink}</p>
              ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
              <p>Regards,<br/><strong>${companyName}</strong></p>
            `
          });
        }

        /* ---------- NOTIFICATION ---------- */
        await Notification.create({
          user: app.user._id, // ✅ correct schema field
          title: "Interview Scheduled",
          label: `Interview for ${jobTitle} on ${interviewDate} at ${interviewTime}`,
          type: "meeting"
        });

      } catch (innerError) {
        // email/notification failure must NOT break the whole request
        console.error(
          "INTERVIEW_SUBTASK_ERROR:",
          app.user?.email || "unknown",
          innerError.message
        );
      }
    });

    await Promise.all(tasks);

    /* ================= SUCCESS ================= */
    return res.status(201).json({
      success: true,
      message: "Interviews scheduled successfully",
      count: interviewsToCreate.length
    });

  } catch (error) {
    console.error("CREATE_INTERVIEW_ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to schedule interview",
      error: error.message
    });
  }
};
