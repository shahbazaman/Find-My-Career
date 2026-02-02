import CompanyProfile from "../models/CompanyProfile.js";

/* ================= CREATE / UPDATE PROFILE ================= */
export const upsertCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      companyName,
      email,
      location,
      industry,
      description,
      logo
    } = req.body;

    const profile = await CompanyProfile.findOneAndUpdate(
      { userId },
      {
        companyName,
        email,
        location,
        industry,
        description,
        logo
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.status(200).json(profile);
  } catch (error) {
    console.error("COMPANY PROFILE UPSERT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET LOGGED-IN COMPANY PROFILE ================= */
export const getMyCompanyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await CompanyProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Company profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("GET COMPANY PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
