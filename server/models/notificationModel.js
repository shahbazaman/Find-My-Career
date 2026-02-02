import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true   // ✅ improves user notification queries
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    label: {
      type: String,
      trim: true,
      default: ""
    },
    deliveredAt: {
      type: Date,
      default: Date.now
    },
    isRead: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      enum: ["event", "meeting", "job", "system", "message", "general"],
      default: "general"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
