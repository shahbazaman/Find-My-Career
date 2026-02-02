import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    interviewDate: {
      type: String,
      required: true
    },
    interviewTime: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      enum: ["Online", "In-person"],
      required: true
    },
    locationOrLink: {
      type: String,
      required: true
    },
    notes: {
      type: String,
      trim: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // recruiter
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);
