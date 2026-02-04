import Interview from "../models/Interview.js";
import Application from "../models/Application.js";
import Notification from "../models/notificationModel.js";
import sendEmail from "../utils/sendEmail.js";

/**
 * POST /api/interviews
 * Create interviews, update application status, send emails, and create notifications.
 */
export const createInterviews = async (req, res) => {
  try {
    // ✅ FIX: match JWT payload (protect middleware sets req.user.id)
    const recruiterId = req.user.id;

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

    /* ================= EMAIL + NOTIFICATION ================= */
    const processEmails = applications.map(async (app) => {
      try {
        const candidateName = `${app.user.firstName || ""} ${app.user.lastName || ""}`.trim();
        const locationLabel = mode === "Online" ? "Meeting Link" : "Office Location";

        if (app.user.email) {
          const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
              <h2>Interview Scheduled</h2>
              <p>Dear <strong>${candidateName}</strong>,</p>
              <p>Your interview for <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been scheduled.</p>
              <p><strong>Date:</strong> ${interviewDate}</p>
              <p><strong>Time:</strong> ${interviewTime}</p>
              <p><strong>Mode:</strong> ${mode}</p>
              <p><strong>${locationLabel}:</strong> ${locationOrLink}</p>
              ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
              <p>Regards,<br/>${companyName}</p>
            </div>
          `;

          await sendEmail({
            to: app.user.email,
            subject: `Interview Scheduled - ${jobTitle}`,
            html: emailHtml
          });
        }

        await Notification.create({
          userId: app.user._id,
          title: "Interview Scheduled",
          label: `Interview for ${jobTitle} on ${interviewDate}`,
          type: "meeting"
        });

      } catch (innerError) {
        // email/notification failure should NOT break the whole flow
        console.error(
          `Interview email failed for ${app.user?.email || "unknown"}:`,
          innerError.message
        );
      }
    });

    await Promise.all(processEmails);

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