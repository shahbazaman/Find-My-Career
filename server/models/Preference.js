import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
  userId:          { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  roles:           { type: String, default: "" },
  locations:       { type: String, default: "" },
  jobType:         { type: String, default: "Full-time" },
  workMode:        { type: String, default: "Onsite" },
  experienceLevel: { type: String, default: "Fresher" },
  expectedSalary:  { type: String, default: "" },
  skills:          { type: String, default: "" },
  availability:    { type: String, default: "Immediate" }
}, { timestamps: true });

export default mongoose.model("Preference", preferenceSchema);