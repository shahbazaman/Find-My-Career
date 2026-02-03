import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

/* ===================== CORS CONFIG (FINAL & STABLE) ===================== */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://find-my-career-gg7zej7z1-shahbaz-amans-projects.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ===================== BODY PARSERS ===================== */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ===================== TEST ROUTE ===================== */
app.get("/", (req, res) => {
  res.send("FindMyCareer API is running 🚀");
});

/* ===================== ROUTES ===================== */
import roleRoutes from "./routes/roleRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import learningRoutes from "./routes/learningRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import companyProfileRoute from "./routes/companyProfileRoute.js";
import jobAutoClose from "./utils/jobAutoClose.js";
import queryRoutes from "./routes/queryRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

app.use("/api/admin", adminUserRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/companies", companyProfileRoute);
app.use("/api/applications", applicationRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/interviews", interviewRoutes);

/* ===================== CRON ===================== */
jobAutoClose();

/* ===================== SERVER ===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
