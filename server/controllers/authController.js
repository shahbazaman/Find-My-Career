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

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

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

/* ================= GOOGLE LOGIN ================= */
export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    let user = await User.findOne({ email });

    if (user && user.provider === "local") {
      return res.status(400).json({
        message: "Account already exists. Please login with email & password."
      });
    }

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

/* ================= REQUEST PASSWORD RESET (🔥 FIXED) ================= */
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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

    // 1. Check your .env variable naming. You have CLIENT_URL in Render.
// 2. Ensure there is no trailing slash in CLIENT_URL to avoid "app.com//reset-password"
// Clean the CLIENT_URL of any trailing slashes, then add the route
const resetLink = `${process.env.CLIENT_URL.replace(/\/$/, "")}/reset-password/${resetToken}`;
await sendEmail({
  to: user.email,
  subject: "Reset Your Password - FindMyCareer", // Added branding
  html: `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
      <h2>Password Reset Request</h2>
      <p>Click the button below to reset your password. This link is valid for 15 minutes.</p>
      <a href="${resetLink}" style="background: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
      <p style="margin-top: 20px; color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
      <p style="word-break: break-all;">${resetLink}</p>
    </div>
  `
});

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("PASSWORD_RESET_ERROR:", error);
    res.status(500).json({
      message: "Failed to send password reset email"
    });
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.hasLocalPassword = true;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
    if (!user) return res.status(404).json({ message: "User not found" });

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
