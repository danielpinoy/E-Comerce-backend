const db = require("../models");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    let token = "";

    // Extract token from Authorization header
    const authorizationHeader = req.header("Authorization");

    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
      token = authorizationHeader.slice(7);
    } else {
      console.error(
        "Authorization header is missing or does not contain a Bearer token"
      );
    }

    if (!token) {
      return res.status(401).json({
        message: "Access denied. Please login first.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    req.user = await db.Users.findOne({
      where: { id: decoded.id },
      attributes: { exclude: ["password"] },
    });

    if (!req.user) {
      return res.status(404).json({
        message: "User not found. Please login again.",
      });
    }

    next();
  } catch (error) {
    // Handle JWT specific errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token. Please login again.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please login again.",
      });
    }

    res.status(500).json({
      message: "Authentication error: " + error.message,
    });
  }
};
