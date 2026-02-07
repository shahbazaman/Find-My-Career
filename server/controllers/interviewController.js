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
    for (const app of applications) {
      try {
        const candidateName = `${app.user.firstName || ""} ${app.user.lastName || ""}`.trim();
        const locationLabel = mode === "Online" ? "Meeting Link" : "Office Location";

        /* ---------- EMAIL ---------- */
        let emailSent = false;

        if (app.user.email) {
          emailSent = await sendEmail({
            to: app.user.email,
            subject: `Interview Scheduled - ${jobTitle}`,
            html: `
              <div style="font-family: sans-serif; line-height: 1.6;">
                <p>Dear <strong>${candidateName || "Candidate"}</strong>,</p>
                <p>
                  Your interview for <strong>${jobTitle}</strong> at
                  <strong>${companyName}</strong> has been scheduled.
                </p>
                <div style="background: #f4f7fe; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
                  <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${interviewDate}</p>
                  <p style="margin: 5px 0;"><strong>⏰ Time:</strong> ${interviewTime}</p>
                  <p style="margin: 5px 0;"><strong>💻 Mode:</strong> ${mode}</p>
                  <p style="margin: 5px 0;">
                    <strong>📍 ${locationLabel}:</strong>
                    <a href="${locationOrLink}">${locationOrLink}</a>
                  </p>
                </div>
                ${notes ? `<p style="margin-top: 15px;"><strong>📝 Notes:</strong> ${notes}</p>` : ""}
                <p style="margin-top: 20px;">
                  Regards,<br/>
                  <strong>${companyName}</strong>
                </p>
              </div>
            `
          });
        }

        if (!emailSent) {
          console.warn(
            "⚠️ Interview email failed for:",
            app.user.email || "unknown"
          );
        }

        /* ---------- NOTIFICATION ---------- */
        await Notification.create({
          user: app.user._id,
          title: "Interview Scheduled",
          label: `Interview for ${jobTitle} on ${interviewDate} at ${interviewTime}`,
          type: "meeting"
        });

        console.log(
          `✅ Interview processed for: ${app.user.email} | Email sent: ${emailSent}`
        );

      } catch (innerError) {
        console.error(
          "INTERVIEW_SUBTASK_ERROR for:",
          app.user?.email || "unknown",
          innerError.message
        );
      }
    }

    /* ================= RESPONSE ================= */
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
