import mongoose from "mongoose";
import Notification from "../models/notificationModel.js";

/* ===============================
   POST: Create notification
   =============================== */
export const createNotification = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, label, type } = req.body;

    // ✅ Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid userId"
      });
    }

    if (!title) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    const notification = await Notification.create({
      userId,
      title,
      label,
      type
    });

    return res.status(201).json({
      message: "Notification created successfully",
      notification
    });

  } catch (error) {
    console.error("Create notification error FULL:", error);
    return res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
};

/* ===============================
   GET: All notifications
   =============================== */
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 });

    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Get notifications error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET: Notifications by user
   =============================== */
export const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    // ✅ Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid userId"
      });
    }

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 });

    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Get user notifications error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/* ===============================
   PATCH: Mark as read
   =============================== */
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid notification id"
      });
    }

    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }

    return res.status(200).json(notification);
  } catch (error) {
    console.error("Mark read error:", error);
    return res.status(500).json({ message: error.message });
  }
};
/* ===============================
   PATCH: Mark ALL as read for a user
   =============================== */
export const markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    // Update all unread notifications for this user
    const result = await Notification.updateMany(
      { userId, isRead: false },
      { $set: { isRead: true } }
    );

    return res.status(200).json({
      message: "All notifications marked as read",
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error("Mark all read error:", error);
    return res.status(500).json({ message: error.message });
  }
};