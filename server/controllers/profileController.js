import Profile from "../models/profileModel.js";
import mongoose from "mongoose";

// Create new profile
export const createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get profile by user ID
export const getProfileByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // ✅ added validation (NO name change)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const profile = await Profile.findOne({ userId });

    if (!profile) return res.json({});

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update existing profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    // validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }
let profile = await Profile.findOne({ userId });

if (!profile) {
  // ✅ CREATE profile (Google users)
  profile = new Profile({
    ...req.body,
    userId
  });
} else {
  // ✅ UPDATE profile (Email users)
  profile.set({
    ...req.body,
    resumeUrl: req.body.resumeUrl || profile.resumeUrl,
    photoUrl: req.body.photoUrl || profile.photoUrl
  });
}

await profile.save();
return res.json(profile);

    // const existingProfile = await Profile.findOne({ userId });

    // if (!existingProfile) {
    //   return res.status(404).json({ error: "Profile not found" });
    // }

    // // ✅ SAFE MERGE (prevents resume/photo wipe)
    // existingProfile.set({
    //   ...req.body,
    //   resumeUrl: req.body.resumeUrl || existingProfile.resumeUrl,
    //   photoUrl: req.body.photoUrl || existingProfile.photoUrl
    // });

    // await existingProfile.save();

    // return res.json(existingProfile); // ✅ ONLY ONE RESPONSE
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

