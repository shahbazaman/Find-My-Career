import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true
    },

    lastName: {
      type: String,
      trim: true
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },

    // Password is required ONLY for local (email) users
    password: {
      type: String
    },

    role: {
      type: String,
      enum: ["job seekers", "recruiters", "admin"],
      default: "job seekers"
    },

    approvalStatus: {
      type: String,
      default: "approved"
    },

    logo: {
      type: String
    },

    // 🔐 Auth provider
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local"
    },

    // 🔑 Firebase UID for Google users
    googleId: {
      type: String
    },

    // ✅ Controls whether email login & reset password are allowed
    hasLocalPassword: {
      type: Boolean,
      default: false
    },

    // 🔁 Password reset (ONLY for users with local password)
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
