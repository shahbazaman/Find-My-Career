// models/Company.js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    logo: {
      type: String
    },

    description: {
      type: String
    },

    industry: {
      type: String
    },

    website: {
      type: String
    },

    headquarters: {
      type: String
    },

    companySize: {
      type: String
    },

    foundedYear: {
      type: Number
    },

    isHiring: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema); // if anyone called "Comapany" after api url, then this schema will export and work there
