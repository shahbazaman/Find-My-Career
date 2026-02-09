import express from "express";
import {
  createNotification,
  getNotifications,
  getUserNotifications,markAllAsRead,
  markAsRead
} from "../controllers/notificationController.js";

const router = express.Router();

/* POST notification for a user */
router.post("/user/:userId", createNotification);

/* GET all notifications */
router.get("/", getNotifications);

/* GET notifications by user */
router.get("/user/:userId", getUserNotifications);
/* NEW: MARK ALL notifications as read for a user */
// Changed from .patch to .post
router.post("/user/:userId/mark-all-read", markAllAsRead);
/* MARK notification as read */
router.patch("/:id/read", markAsRead);

export default router;
