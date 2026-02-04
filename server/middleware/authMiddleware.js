import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Auth middleware
 * - Verifies JWT token
 * - Fetches user from DB
 * - Attaches normalized req.user
 */
const protect = async (req, res, next) => {
  let token;

  /* ================= READ TOKEN ================= */
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, token missing"
    });
  }

  try {
    /* ================= VERIFY TOKEN ================= */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* ================= FETCH USER ================= */
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    /* ================= NORMALIZE req.user ================= */
    req.user = user;          // full mongoose document
    req.user.id = user._id;   // ensure req.user.id is always available

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

export default protect;
