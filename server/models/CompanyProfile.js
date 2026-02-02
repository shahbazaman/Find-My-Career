import mongoose from "mongoose";

const companyProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    companyName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      trim: true
    },

    industry: {
      type: String,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    logo: {
      type: String, // Cloudinary URL or image URL
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("CompanyProfile", companyProfileSchema);
