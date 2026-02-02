import express from "express";
import {
  getUserByIdAdmin,
  updateUserAdmin,
  deleteUserAdmin
} from "../controllers/adminUserController.js";
import adminProtect from "../middleware/adminProtect.js";

const router = express.Router();

router.get("/users/:id", adminProtect, getUserByIdAdmin);
router.put("/users/:id", adminProtect, updateUserAdmin);
router.delete("/users/:id", adminProtect, deleteUserAdmin);

export default router;
