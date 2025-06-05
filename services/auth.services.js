const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userDb = db.Users;

// Generate JWT Token
const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET || "your-secret-key";
  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  };
  return jwt.sign(payload, secretKey, options);
};

// Hash Password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Register new user
exports.register = async (userData) => {
  // Validate required fields
  if (
    !userData.email ||
    !userData.password ||
    !userData.firstName ||
    !userData.lastName
  ) {
    const error = new Error(
      "Email, password, first name, and last name are required!"
    );
    error.status = 400;
    throw error;
  }

  // Check if email already exists
  const emailExists = await userDb.findOne({
    where: { email: userData.email },
  });

  if (emailExists) {
    const error = new Error("Email already in use!");
    error.status = 400;
    throw error;
  }

  // Hash password
  const hashedPassword = await hashPassword(userData.password);
  userData.password = hashedPassword;

  // Create user
  const user = await userDb.create(userData);

  // Remove password from response
  delete user.dataValues.password;

  // Generate token
  const token = generateToken({ id: user.id });

  return {
    user,
    token,
    message: "User registered successfully!",
  };
};

// Login user
exports.login = async (email, password) => {
  // Validate required fields
  if (!email || !password) {
    const error = new Error("Email and password are required!");
    error.status = 400;
    throw error;
  }

  // Find user by email
  const user = await userDb.findOne({
    where: { email },
  });

  if (!user) {
    const error = new Error("Invalid email or password!");
    error.status = 401;
    throw error;
  }

  // Verify password
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    const error = new Error("Invalid email or password!");
    error.status = 401;
    throw error;
  }

  // Remove password from response
  delete user.dataValues.password;

  // Generate token
  const token = generateToken({ id: user.id });

  return {
    user,
    token,
    message: "Login successful!",
  };
};

// Get user profile (for authenticated users)
exports.getProfile = async (userId) => {
  const user = await userDb.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    const error = new Error("User not found!");
    error.status = 404;
    throw error;
  }

  return user;
};

// Update user profile
exports.updateProfile = async (userId, updateData) => {
  // Don't allow password updates through this method
  if (updateData.password) {
    delete updateData.password;
  }

  const user = await userDb.findByPk(userId);
  if (!user) {
    const error = new Error("User not found!");
    error.status = 404;
    throw error;
  }

  await user.update(updateData);

  // Remove password from response
  delete user.dataValues.password;

  return {
    user,
    message: "Profile updated successfully!",
  };
};

// Change password (separate method for security)
exports.changePassword = async (userId, oldPassword, newPassword) => {
  if (!oldPassword || !newPassword) {
    const error = new Error("Old password and new password are required!");
    error.status = 400;
    throw error;
  }

  const user = await userDb.findByPk(userId);
  if (!user) {
    const error = new Error("User not found!");
    error.status = 404;
    throw error;
  }

  // Verify old password
  const passwordIsValid = await bcrypt.compare(oldPassword, user.password);
  if (!passwordIsValid) {
    const error = new Error("Current password is incorrect!");
    error.status = 401;
    throw error;
  }

  // Hash new password
  const hashedNewPassword = await hashPassword(newPassword);

  // Update password
  await user.update({ password: hashedNewPassword });

  return {
    message: "Password changed successfully!",
  };
};
