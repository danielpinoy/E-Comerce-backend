const authServices = require("../services/auth.services");

// Register new user
exports.register = async (req, res, next) => {
  try {
    const result = await authServices.register(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred during registration",
    });
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authServices.login(email, password);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred during login",
    });
  }
};

// Get current user profile (requires authentication)
exports.getProfile = async (req, res, next) => {
  try {
    const user = await authServices.getProfile(req.user.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while retrieving profile",
    });
  }
};

// Update current user profile (requires authentication)
exports.updateProfile = async (req, res, next) => {
  try {
    const result = await authServices.updateProfile(req.user.id, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while updating profile",
    });
  }
};

// Change password (requires authentication)
exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const result = await authServices.changePassword(
      req.user.id,
      oldPassword,
      newPassword
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while changing password",
    });
  }
};

// Logout (client-side handles token removal, but we can provide endpoint)
exports.logout = async (req, res, next) => {
  try {
    res.status(200).send({
      message:
        "Logged out successfully! Please remove the token from client storage.",
    });
  } catch (error) {
    res.status(500).send({
      message: "An error occurred during logout",
    });
  }
};
