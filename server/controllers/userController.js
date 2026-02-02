import User from "../models/User.js";
import Company from "../models/companyModel.js";

/* ===================== GET USER BY ID ===================== */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "firstName lastName email role approvalStatus logo provider"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      approvalStatus: user.approvalStatus,
      logo: user.logo,
      provider: user.provider
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ===================== UPDATE NAME ===================== */
export const updateName = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName;
    user.lastName = lastName;

    await user.save();

    res.json({
      firstName: user.firstName,
      lastName: user.lastName
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { phone, location } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.phone = phone;
    user.location = location;

    await user.save();

    res.json({
      phone: user.phone,
      location: user.location
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ===================== DELETE ACCOUNT ===================== */
export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If recruiter → delete company
    if (user.role === "recruiters") {
      await Company.deleteMany({ recruiter: user._id });
    }

    await User.findByIdAndDelete(user._id);

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ===================== UPLOAD LOGO ===================== */
export const uploadLogo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.logo = req.body.logo;
    await user.save();

    res.json({ logo: user.logo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
import bcrypt from "bcryptjs"; // Ensure you have this installed

/* ===================== CREATE NEW USER (ADMIN) ===================== */
export const createUser = async (req, res) => {
  try {
    const { 
      firstName, lastName, email, password, 
      role, approvalStatus, logo, provider 
    } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password if it's a local user
    let hashedPassword = "";
    if (password && provider === "local") {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // 3. Create User
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      approvalStatus: approvalStatus || "approved",
      logo,
      provider: provider || "local",
      hasLocalPassword: provider === "local" ? true : false
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ message: error.message });
  }
};