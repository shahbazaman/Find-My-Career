import express from "express";
import {
  createNotification,
  getNotifications,
  getUserNotifications,
  markAsRead
} from "../controllers/notificationController.js";

const router = express.Router();

/* POST notification for a user */
router.post("/user/:userId", createNotification);

/* GET all notifications */
router.get("/", getNotifications);

/* GET notifications by user */
router.get("/user/:userId", getUserNotifications);

/* MARK notification as read */
router.patch("/:id/read", markAsRead);

export default router;
