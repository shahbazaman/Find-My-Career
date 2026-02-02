// models/Learning.js
import mongoose from "mongoose";

const learningSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    courses: [
      {
        title: {
          type: String,
          required: true
        },

        description: {
          type: String
        },

        hoursSpent: {
          type: Number,
          default: 0
        },

        progress: {
          type: Number,
          default: 0
        },

        status: {
          type: String,
          enum: ["not-started", "in-progress", "completed"],
          default: "not-started"
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Learning", learningSchema);
