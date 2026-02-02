// models/Role.js
import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    description: {
      type: String
    },

    skills: [
      {
        type: String
      }
    ],

    averageSalary: {
      type: String
    },

    careerPath: [
      {
        type: String
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Role", roleSchema);  // mongodb collection name is simillar to this(autogenerate name based on this)

// instead you can use this export
// const roleModel = mongoose.model("Role", roleSchema);
// module.exports = roleModel