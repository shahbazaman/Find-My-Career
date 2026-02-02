import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Shortlisted",
        "Interview Scheduled",
        "Rejected",
        "Hired"
      ],
      default: "Applied"
    },
    interviewNotes: {
  type: String,
  default: ""
}

  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
