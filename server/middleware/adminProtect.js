const adminProtect = (req, res, next) => {
  const adminKey = req.headers["x-admin-key"];

  if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Admin access denied" });
  }

  next();
};

export default adminProtect;
