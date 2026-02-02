import mongoose from "mongoose";
import Query from "../models/queryModel.js";
import Notification from "../models/notificationModel.js";

/* ===============================
   POST: Create Query (User)
   =============================== */
export const createQuery = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, subject, message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const query = await Query.create({
      userId,
      name,
      email,
      subject,
      message
    });

    // 🔔 Notify user (confirmation)
    await Notification.create({
      userId,
      title: "Query Submitted",
      label: "Your query was submitted successfully.",
      type: "general"
    });

    res.status(201).json(query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET: All Queries (Admin)
   =============================== */
export const getAllQueries = async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   POST: Reply to Query (Admin)
   =============================== */
export const replyToQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid query id" });
    }

    const query = await Query.findByIdAndUpdate(
      id,
      { reply, isRead: true },
      { new: true }
    );

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    // 🔔 Notify job seeker with admin reply
    await Notification.create({
      userId: query.userId,
      title: "Admin Reply to Your Query",
      label: reply,
      type: "message"
    });

    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
