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

    
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local"
    },

    
    googleId: {
      type: String
    },

    
    hasLocalPassword: {
      type: Boolean,
      default: false
    },

    
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
