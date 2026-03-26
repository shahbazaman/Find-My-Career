// models/CourseProgress.js
import mongoose from "mongoose";
const courseProgressSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseKey:     { type: String, required: true },  // e.g. "aptitude", "dsa"
  completedPages:{ type: [Number], default: [] },   // [1, 2, 3...]
  totalPages:    { type: Number, required: true }
}, { timestamps: true });
courseProgressSchema.index({ userId: true, courseKey: true }, { unique: true });
export default mongoose.model("CourseProgress", courseProgressSchema);