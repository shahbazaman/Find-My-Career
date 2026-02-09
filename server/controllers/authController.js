import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Company from "../models/companyModel.js";
import admin from "../utils/firebaseAdmin.js";

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

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.provider === "google" && !user.hasLocalPassword) {
      return res.status(400).json({
        message: "Please login using Google or set a password first"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

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

    return res.json({
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
    return res.status(500).json({ message: err.message });
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

    return res.json({
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
    return res.status(401).json({ message: "Google authentication failed" });
  }
};
/* ================= REQUEST PASSWORD RESET (LOCAL USERS ONLY) ================= */
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

    // 🚫 Email sending temporarily disabled
    return res.json({
      message: "Password reset email feature is temporarily disabled"
    });

  } catch (error) {
    console.error("PASSWORD_RESET_ERROR:", error);
    return res.status(500).json({
      message: "Failed to process password reset request"
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

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.provider !== "google" || user.hasLocalPassword) {
      return res.status(400).json({
        message: "Password already set for this account"
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.hasLocalPassword = true;

    await user.save();

    return res.json({ message: "Password set successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
