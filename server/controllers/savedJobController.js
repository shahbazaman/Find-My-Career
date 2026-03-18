import SavedJob from "../models/SavedJob.js";

export const saveJob = async (req, res) => {
  try {
    const exists = await SavedJob.findOne({
      job: req.params.jobId,
      user: req.user.id
    });

    if (exists) return res.status(400).json({ message: "Already saved" });

    const saved = await SavedJob.create({
      job: req.params.jobId,
      user: req.user.id
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const jobs = await SavedJob.find({ user: req.user.id }).populate("job");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD THIS:
export const unsaveJob = async (req, res) => {
  try {
    await SavedJob.findOneAndDelete({
      job: req.params.jobId,
      user: req.user.id
    });
    res.json({ message: "Job removed from saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};