import express from "express";
import {
  createQuery,
  getAllQueries,
  replyToQuery
} from "../controllers/queryController.js";

const router = express.Router();

/* USER submits query */
router.post("/user/:userId", createQuery);

/* ADMIN fetch all queries */
router.get("/admin", getAllQueries);

/* ADMIN reply to query */
router.post("/admin/reply/:id", replyToQuery);

export default router;
