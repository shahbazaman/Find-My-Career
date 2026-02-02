import mongoose from "mongoose";

/* ================= EXPERIENCE ================= */
const experienceSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      trim: true
    },
    company: {
      type: String,
      trim: true
    },
    startDate: {
      type: Date,              // ✅ FIXED (was String)
      required: true
    },
    endDate: {
      type: Date,              // ✅ FIXED (was String)
      default: null             // null = currently working
    },
    responsibilities: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);

/* ================= EDUCATION ================= */
const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      trim: true
    },
    institute: {
      type: String,
      trim: true
    },
    startYear: {
      type: Number             // ✅ FIXED (was String)
    },
    endYear: {
      type: Number
    },
    cgpa: {
      type: String,
      trim: true
    },
    highlights: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);

/* ================= SKILLS ================= */
const skillsSchema = new mongoose.Schema(
  {
    primarySkills: {
      type: String,
      trim: true
    },
    summary: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);

/* ================= PROFILE ================= */
const ProfileSchema = new mongoose.Schema(
  {
    /* BASIC INFO (kept for UI compatibility) */
    name: {
      type: String,
      trim: true
    },
    dob: Date,                 // ✅ FIXED (was String)
    nationality: String,
    idType: String,
    mobile: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    address: String,
    location: String,

    /* FILES */
    resumeUrl: {
      type: String,
      default: ""
    },
    photoUrl: {
      type: String,
      default: ""
    },

    /* PROFESSIONAL DATA */
    experience: {
      type: [experienceSchema],
      default: []              // ✅ important
    },
    education: {
      type: [educationSchema],
      default: []
    },
    skills: {
      type: skillsSchema,
      default: {}
    },

    /* LINK TO USER */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,            // ✅ one profile per user
      index: true              // ✅ fast lookup in applicants
    }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);
