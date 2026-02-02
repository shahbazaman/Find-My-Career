import SavedJob from "../models/SavedJob.js";

export const saveJob = async (req, res) => {
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
};

export const getSavedJobs = async (req, res) => {
  const jobs = await SavedJob.find({ user: req.user.id }).populate("job");
  res.json(jobs);
};
