import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("FindMyCareer API is running 🚀");
});

// Routes
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

// ✅ START CRON JOB
jobAutoClose();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
