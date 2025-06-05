const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/", isAuthenticated, userController.getAllUsers);
router.get("/:id", isAuthenticated, userController.getUserById);
router.put("/:id", isAuthenticated, userController.updateUser);
router.delete("/:id", isAuthenticated, userController.deleteUser);

module.exports = router;
