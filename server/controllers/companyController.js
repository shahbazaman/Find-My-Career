import Company from "../models/companyModel.js";

/* ================= CREATE COMPANY ================= */
export const createCompany = async (req, res) => {
  try {
    // recruiters can only have ONE company
    if (req.user.role === "recruiters") {
      const exists = await Company.findOne({ owner: req.user.id });
      if (exists) {
        return res.status(400).json({
          message: "Company already exists"
        });
      }
    }

    const company = await Company.create({
      ...req.body,
      owner: req.user.role === "recruiters" ? req.user.id : null
    });

    res.status(201).json(company);
  } catch (err) {
    console.error("CREATE COMPANY ERROR:", err);
    res.status(400).json({ message: err.message });
  }
};

/* ================= GET MY COMPANY (TOKEN BASED) ================= */
export const getMyCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ owner: req.user.id });

    if (!company) {
      return res.status(404).json({
        message: "Company profile not found"
      });
    }

    res.json(company);
  } catch (error) {
    console.error("GET MY COMPANY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ALL COMPANIES ================= */
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (error) {
    console.error("GET COMPANIES ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET COMPANY BY ID ================= */
export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ HARD GUARD – prevents CastError forever
    if (!id || id === "undefined" || id === "me") {
      return res.status(400).json({
        message: "Invalid company id"
      });
    }

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    res.json(company);
  } catch (error) {
    console.error("GET COMPANY BY ID ERROR:", error);
    res.status(500).json({ message: "Invalid company ID format" });
  }
};

/* ================= UPDATE MY COMPANY ================= */
export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      { owner: req.user.id },   // ✅ FIXED
      req.body,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company profile not found"
      });
    }

    res.json(company);
  } catch (error) {
    console.error("UPDATE COMPANY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE MY COMPANY ================= */
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndDelete({
      owner: req.user.id   // ✅ FIXED
    });

    if (!company) {
      return res.status(404).json({
        message: "Company profile not found"
      });
    }

    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error("DELETE COMPANY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
