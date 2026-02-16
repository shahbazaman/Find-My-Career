import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Admin Login Controller
 * Handles authentication for admin users
 */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email and password are required" 
      });
    }

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: "Invalid credentials" 
      });
    }

    // 2️⃣ Check if user has admin role
    if (user.role !== "admin") {
      return res.status(403).json({ 
        message: "Access denied. Not an admin." 
      });
    }

    // 3️⃣ Verify password exists and is valid
    if (!user.password) {
      return res.status(400).json({ 
        message: "Invalid credentials" 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        message: "Invalid credentials" 
      });
    }

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Send success response
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`.trim()
      },
      message: "Login successful"
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ 
      message: "Server error. Please try again later." 
    });
  }
};

/**
 * Verify Admin Token Middleware
 * Use this to protect admin routes
 */
export const verifyAdminToken = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ 
        message: "Access denied. No token provided." 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ 
        message: "Access denied. Admin privileges required." 
      });
    }

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ 
        message: "Token expired. Please login again." 
      });
    }
    
    return res.status(401).json({ 
      message: "Invalid token." 
    });
  }
};