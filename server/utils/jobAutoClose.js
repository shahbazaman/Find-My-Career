import cron from "node-cron";
import Job from "../models/jobModel.js";
import Notification from "../models/notificationModel.js";

const jobAutoClose = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const now = new Date();

      const jobsToClose = await Job.find({
        deadline: { $lte: now },
        status: "open",
      });

      for (const job of jobsToClose) {
        job.status = "closed";
        await job.save();

        // 🔔 Notify recruiter
        await Notification.create({
          user: job.recruiter,
          title: "Job Automatically Closed",
          message: `Your job "${job.jobTitle}" has been automatically closed due to deadline expiry.`,
        });
      }

      if (jobsToClose.length > 0) {
        console.log(`🔒 Auto-closed ${jobsToClose.length} jobs`);
      }
    } catch (error) {
      console.error("❌ Job auto-close error:", error.message);
    }
  });
};

export default jobAutoClose;
