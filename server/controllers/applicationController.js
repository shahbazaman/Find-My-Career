import Application from "../models/Application.js";
import Job from "../models/jobModel.js";
import User from "../models/User.js";
import Profile from "../models/profileModel.js";
/* =========================================================
   APPLY FOR A JOB (JOB SEEKER ONLY)
========================================================= */
export const applyForJob = async (req, res) => {
  try {
    if (req.user.role !== "job seekers") {
      return res.status(403).json({ message: "Only job seekers can apply" });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const exists = await Application.findOne({
      job: job._id,
      user: req.user._id
    });

    if (exists) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      user: req.user._id,
      job: job._id,
      recruiter: job.recruiter,
      status: "Applied"
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================================================
   UPDATE APPLICATION STATUS (RECRUITER ONLY)
========================================================= */
export const updateApplicationStatus = async (req, res) => {
  try {
    if (req.user.role !== "recruiters") {
      return res.status(403).json({
        message: "Only recruiters can update application status"
      });
    }

    const { status } = req.body;

    const allowedStatuses = [
      "Applied",
      "Shortlisted",
      "Interview Scheduled",
      "Rejected",
      "Hired"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.id)
      .populate("job");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // recruiter ownership check
    if (
      application.job.recruiter.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   GET APPLICANTS FOR A JOB (RECRUITER DASHBOARD)
========================================================= */

export const getApplicantsByJob = async (req, res) => {
  try {
    // Only recruiters allowed
    if (req.user.role !== "recruiters") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Verify job ownership
    const job = await Job.findOne({
      _id: req.params.jobId,
      recruiter: req.user._id
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }

    const applications = await Application.find({ job: job._id })
      .populate("user", "firstName lastName email")
      .sort({ createdAt: -1 });

    const result = await Promise.all(
      applications.map(async (app) => {
        const profile = await Profile.findOne({ userId: app.user._id })
          .select("experience resumeUrl");

        return {
          _id: app._id,
          status: app.status,
          user: app.user,
          profile
        };
      })
    );

    res.json(result);
  } catch (error) {
    console.error("GET APPLICANTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/* =========================================================
   GET FULL APPLICANT PROFILE (RECRUITER VIEW)
========================================================= */
export const getApplicationProfile = async (req, res) => {
  try {
    if (req.user.role !== "recruiters") {
      return res.status(403).json({
        message: "Only recruiters can view applicant profiles"
      });
    }

    const application = await Application.findById(req.params.id)
      .populate({
        path: "job",
        select: "jobTitle recruiter"
      })
      .populate({
        path: "user",
        select: "-password"
      });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (
      application.job.recruiter.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json(application);
  } catch (error) {
    console.error("GET APPLICANT PROFILE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateInterviewNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    const application = await Application.findById(req.params.id)
      .populate("job");

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    application.interviewNotes = notes;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id
    })
      .populate("job", "_id companyName jobTitle")
      .sort({ createdAt: -1 });

    const formatted = applications.map(app => ({
      job: app.job?._id || null,          // ✅ IMPORTANT
      company: app.job?.companyName || "Job Removed",
      role: app.job?.jobTitle || "N/A",
      date: app.createdAt.toISOString().slice(0, 10),
      status: app.status                  // ✅ REAL STATUS
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicantsForRecruiter = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user._id }).select("_id");

    if (!jobs.length) {
      return res.json([]);
    }
    const jobIds = jobs.map(j => j._id);
    const applications = await Application.find({
      job: { $in: jobIds }
    })
      .populate("job", "jobTitle companyName")
      .populate("user", "firstName lastName email");

    const result = [];
    for (const app of applications) {
      if (!app.user) {
        console.log("⚠️ Skipping application with null user:", app._id);
        continue;
      }
      const profile = await Profile.findOne({ userId: app.user._id })
        .select("experience resumeUrl");
      result.push({
        _id: app._id,
        status: app.status,
        job: app.job || null,
        user: app.user,
        profile: profile || null
      });
    }
    res.json(result);

  } catch (error) {
    console.error("GET RECRUITER APPLICANTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
/* =========================================================
   GET MY APPLICATION STATS (JOB SEEKER)
========================================================= */
export const getMyApplicationStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const [total, inReview, interviews] = await Promise.all([
      Application.countDocuments({ user: userId }),
      Application.countDocuments({
        user: userId,
        status: "Applied"
      }),
      Application.countDocuments({
        user: userId,
        status: "Interview Scheduled"
      })
    ]);

    res.json({
      total,
      inReview,
      interviews
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


