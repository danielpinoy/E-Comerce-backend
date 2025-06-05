const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/profile", isAuthenticated, authController.getProfile);
router.put("/profile", isAuthenticated, authController.updateProfile);
router.put("/change-password", isAuthenticated, authController.changePassword);
router.post("/logout", authController.logout);

module.exports = router;
