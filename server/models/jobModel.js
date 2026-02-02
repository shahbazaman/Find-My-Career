// models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    companyName: {
      type: String,
      required: true,
      trim: true
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true
    },

   jobType: {
  type: String,
  enum: ["full-time", "part-time", "internship", "contract"], // ✅ added
  required: true
},

    location: {
      type: String,
      required: true,
      trim: true
    },

    workMode: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      required: true
    },

    salaryMin: { type: Number, min: 0 },
    salaryMax: { type: Number, min: 0 },

    experienceMin: { type: Number, min: 0, default: 0 },
    experienceMax: { type: Number, min: 0 },

    deadline: { type: Date },

    description: {
      type: String,
      required: true
    },

    requirements: {
      type: String,
      required: true
    },

    benefits: {
      type: [String],
      default: []
    },

    companyLogo: {
      type: String
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    }
  },
  { timestamps: true }
);
// 🔍 Compound index for fast job filtering
jobSchema.index({ status: 1, location: 1 });

export default mongoose.model("Job", jobSchema);
