import cron from "node-cron";
import mongoose from "mongoose";
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js"; // adjust path if different

const JOB_PREP_TITLE = "Prepare for Your Interview!";

export const startCronJobs = () => {
  // Runs at 9:00 AM on the 1st of every month
  cron.schedule("0 9 1 * *", async () => {
    console.log("🕐 Running monthly interview prep notification job...");

    try {
      const users = await User.find({}, "_id");

      const notifications = users.map((user) => ({
        userId: user._id,
        title: JOB_PREP_TITLE,
        label:
          "It's a new month — a great time to sharpen your skills and ace your next interview. Click below to start preparing!",
        type: "job",
        isRead: false,
        deliveredAt: new Date(),
      }));

      await Notification.insertMany(notifications);
      console.log(`✅ Interview prep notifications sent to ${users.length} users.`);
    } catch (err) {
      console.error("❌ Cron job error:", err.message);
    }
  });

  console.log("✅ Cron jobs registered.");
};