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
    // req.user._id comes from your protect middleware
    const recruiterId = req.user._id;

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

    // 1. Validation
    if (!Array.isArray(applicationIds) || applicationIds.length === 0) {
      return res.status(400).json({ message: "No applications selected" });
    }

    // 2. Fetch applications with user details
    const applications = await Application.find({
      _id: { $in: applicationIds }
    }).populate("user", "email firstName lastName");

    if (!applications.length) {
      return res.status(404).json({ message: "Applications not found" });
    }

    // 3. Create interview records in the Database
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

    // 4. Update application status to 'Interview Scheduled'
    await Application.updateMany(
      { _id: { $in: applicationIds } },
      { $set: { status: "Interview Scheduled" } }
    );

    // 5. Define the process for Emails and Notifications
    // This is the 'processEmails' array of promises
    const processEmails = applications.map(async (app) => {
      try {
        const candidateName = `${app.user.firstName || ""} ${app.user.lastName || ""}`.trim();
        const locationLabel = mode === "Online" ? "Meeting Link" : "Office Location";

        // --- SEND EMAIL ---
        if (app.user.email) {
          const emailHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
              <div style="background: #667eea; color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0;">Interview Invitation</h2>
              </div>
              <div style="padding: 20px;">
                <p>Dear <strong>${candidateName}</strong>,</p>
                <p>Your interview for <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been scheduled.</p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 5px 0;">📅 <strong>Date:</strong> ${interviewDate}</p>
                  <p style="margin: 5px 0;">⏰ <strong>Time:</strong> ${interviewTime}</p>
                  <p style="margin: 5px 0;">📍 <strong>Mode:</strong> ${mode}</p>
                  <p style="margin: 5px 0;">🔗 <strong>${locationLabel}:</strong> <a href="${locationOrLink}">${locationOrLink}</a></p>
                </div>
                ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
                <p>Best regards,<br/><strong>${companyName} Team</strong></p>
              </div>
            </div>
          `;

          await sendEmail({
            to: app.user.email,
            subject: `Interview Scheduled - ${jobTitle}`,
            html: emailHtml
          });
        }

        // --- CREATE NOTIFICATION ---
        // userId: Matches your schema's 'userId' field
        // type: 'meeting' (Matches your enum: event, meeting, job, system, message, general)
        await Notification.create({
          userId: app.user._id,
          title: "Interview Scheduled",
          label: `New interview for ${jobTitle} at ${companyName} on ${interviewDate}`,
          type: "meeting" 
        });

      } catch (innerError) {
        // If one person's email fails, we log it but don't stop the whole process
        console.error(`Error processing candidate ${app.user?.email || 'unknown'}:`, innerError.message);
      }
    });

    // 6. Execute all emails and notifications in parallel
    await Promise.all(processEmails);

    // 7. Success response to frontend
    return res.status(201).json({
      success: true,
      message: "Interviews scheduled, emails and notifications sent successfully",
      count: interviewsToCreate.length
    });

  } catch (error) {
    console.error("CREATE INTERVIEW ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to schedule interview",
      error: error.message
    });
  }
};