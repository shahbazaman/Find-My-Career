// controllers/jobController.js
import Job from "../models/jobModel.js";

/**
 * CREATE JOB (RECRUITER ONLY)
 */
export const createJob = async (req, res) => {
  try {
    if (
      req.user.role !== "recruiters" &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Only recruiters or admin can post jobs"
      });
    }
    const job = await Job.create({
      ...req.body,
      recruiter: req.user.id
    });

    res.status(201).json(job);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


/**
 * GET ALL JOBS (PUBLIC – JOB SEEKERS)
 */
export const getJobs = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { jobTitle: { $regex: req.query.search, $options: "i" } },
            { companyName: { $regex: req.query.search, $options: "i" } },
            { requirements: { $regex: req.query.search, $options: "i" } }
          ]
        }
      : {};

    const jobs = await Job.find(keyword)
      .sort({ createdAt: -1 })
      .select("-recruiter"); // hide owner from public

    res.json({
      jobs,
      totalJobs: jobs.length
    });
  } catch (error) {
    console.error("GET JOBS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET JOB BY ID (PUBLIC)
 */
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).select("-recruiter");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET MY JOBS (RECRUITER DASHBOARD)
 */
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id })
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE JOB (OWNER ONLY)
 */
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, recruiter: req.user.id },
      req.body,
      { new: true }
    );

    if (!job) return res.status(404).json({ message: "Job not found or unauthorized" });
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * DELETE JOB (OWNER ONLY)
 */
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      recruiter: req.user.id
    });

    if (!job) return res.status(404).json({ message: "Job not found or unauthorized" });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN — REOPEN JOB
 */
export const reopenJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    job.status = "open";
    await job.save();

    res.json({ message: "Job reopened successfully", job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= GET ALL UNIQUE ROLES ================= */
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Job.distinct("jobTitle");
    res.json(roles);
  } catch (error) {
    console.error("GET ROLES ERROR:", error);
    res.status(500).json({ message: "Failed to fetch roles" });
  }
};

export const getJobRoles = async (req, res) => {
  try {
    const roles = await Job.distinct("jobTitle");
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

