import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Company from "../models/companyModel.js";
import admin from "../utils/firebaseAdmin.js";
import Interview from "../models/Interview.js";
import Application from "../models/Application.js";
import Notification from "../models/notificationModel.js";
import sendEmail from "../utils/sendEmail.js";

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, logo } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      logo,
      provider: "local",
      hasLocalPassword: true
    });

    if (role === "recruiters") {
      await Company.create({
        recruiter: user._id,
        name: `${firstName} ${lastName}`,
        about: "Company profile not updated yet"
      });
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= LOGIN (EMAIL/PASSWORD) ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    // ❌ Block Google-only users
    if (user.provider === "google" && !user.hasLocalPassword) {
      return res.status(400).json({
        message: "Please login using Google or set a password first"
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (user.role === "recruiters" && user.approvalStatus !== "approved") {
      return res.status(403).json({
        message: "Your account is pending admin approval"
      });
    }
    const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        logo: user.logo,
        approvalStatus: user.approvalStatus
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/* ================= GOOGLE LOGIN (FIREBASE) ================= */
export const googleLogin = async (req, res) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;
    let user = await User.findOne({ email });
    // ❌ Email already exists as LOCAL account
    if (user && user.provider === "local") {
      return res.status(400).json({
        message: "Account already exists. Please login with email & password."
      });
    }
    // ✅ Create new Google user
    if (!user) {
      const [firstName, ...rest] = name ? name.split(" ") : ["User"];
      const lastName = rest.join(" ");

      user = await User.create({
        firstName,
        lastName,
        email,
        logo: picture,
        role: "job seekers",
        approvalStatus: "approved",
        provider: "google",
        googleId: uid,
        hasLocalPassword: false
      });
    }
    const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        logo: user.logo,
        approvalStatus: user.approvalStatus
      }
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(401).json({ message: "Google authentication failed" });
  }
};

/* ================= REQUEST PASSWORD RESET ================= */
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  // ❌ Block Google-only users
  if (user.provider === "google" && !user.hasLocalPassword) {
    return res.status(400).json({
      message: "Please login using Google or set a password first"
    });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Reset Your Password",
    html: `
      <p>You requested a password reset.</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link expires in 15 minutes.</p>
    `
  });

  res.json({ message: "Password reset email sent" });
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  user.password = await bcrypt.hash(req.body.password, 10);
  user.hasLocalPassword = true;
  user.provider = user.provider || "local";
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};


/* ================= SET PASSWORD (GOOGLE USERS) ================= */
export const setPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user.id;

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Block normal users from using this
    if (user.provider !== "google" || user.hasLocalPassword) {
      return res.status(400).json({
        message: "Password already set for this account"
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.hasLocalPassword = true;

    await user.save();

    res.json({ message: "Password set successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createInterviews = async (req, res) => {
  try {
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

    // 1. Fetch applications and populate user data (email and names)
    const applications = await Application.find({
      _id: { $in: applicationIds }
    }).populate("user", "email firstName lastName");

    if (!applications.length) {
      return res.status(404).json({ message: "No valid applications found." });
    }

    // 2. Prepare Interview records
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

    // 3. Save all interviews & update application statuses
    await Interview.insertMany(interviewsToCreate);
    await Application.updateMany(
      { _id: { $in: applicationIds } },
      { $set: { status: "Interview Scheduled" } }
    );

    // 4. Send Emails & Notifications to all candidates in parallel
    const processEmails = applications.map(async (app) => {
      const candidateName = `${app.user.firstName || "Candidate"} ${app.user.lastName || ""}`.trim();
      const locationLabel = mode === "Online" ? "Meeting Link" : "Office Location";

      // HTML Template for the email
      const htmlContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">Interview Scheduled</h1>
          </div>
          <div style="padding: 30px; color: #2d3748; line-height: 1.6;">
            <p>Dear <strong>${candidateName}</strong>,</p>
            <p>We are excited to invite you for an interview for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.</p>
            
            <div style="background: #f7fafc; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0;">
              <p style="margin: 0 0 10px 0;">📅 <strong>Date:</strong> ${interviewDate}</p>
              <p style="margin: 0 0 10px 0;">⏰ <strong>Time:</strong> ${interviewTime}</p>
              <p style="margin: 0 0 10px 0;">📍 <strong>Mode:</strong> ${mode}</p>
              <p style="margin: 0;">🔗 <strong>${locationLabel}:</strong> <a href="${locationOrLink}" style="color: #667eea;">${locationOrLink}</a></p>
            </div>

            ${notes ? `<p style="font-size: 0.95rem; color: #4a5568;"><strong>Recruiter Notes:</strong><br/>${notes}</p>` : ""}

            <p style="margin-top: 30px;">We look forward to speaking with you!</p>
            <hr style="border: none; border-top: 1px solid #edf2f7; margin: 20px 0;" />
            <p style="font-size: 0.85rem; color: #718096; text-align: center;">Sent via FindMyCareer Portal</p>
          </div>
        </div>
      `;

      // Trigger your sendEmail utility
      await sendEmail({
        to: app.user.email,
        subject: `Interview Invitation: ${jobTitle} at ${companyName}`,
        html: htmlContent
      });

      // Also create an in-app notification
      await Notification.create({
        user: app.user._id,
        title: "Interview Scheduled",
        label: `New interview for ${jobTitle} on ${interviewDate} at ${interviewTime}`,
        type: "interview"
      });
    });

    // Execute all email/notification tasks
    await Promise.all(processEmails);

    return res.status(201).json({
      success: true,
      message: `Successfully scheduled ${applications.length} interview(s) and sent notifications.`
    });

  } catch (error) {
    console.error("INTERVIEW_CONTROLLER_ERROR:", error);
    res.status(500).json({ message: "Failed to schedule interviews", error: error.message });
  }
};