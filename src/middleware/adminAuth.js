import jwt from "jsonwebtoken";
import { ADMIN_PRIVATE_KEY_TOKEN } from "../config/serverConfig.js";
const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "not authorised login again",
        success: false,
      });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.json({
        message: "not authorised login again",
        success: false,
      });
    }
    const decoded = jwt.verify(token, ADMIN_PRIVATE_KEY_TOKEN);
    if (!decoded) {
      return res.json({ message: "invalid token", success: false });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
};

export default adminAuth;
