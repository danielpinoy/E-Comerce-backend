const db = require("../models");
const userDb = db.Users;

exports.getAllUsers = async () => {
  const users = await userDb.findAll({
    attributes: { exclude: ["password"] },
  });

  if (!users) {
    const error = new Error("No users found.");
    error.status = 404;
    throw error;
  }

  return users;
};

exports.getUserById = async (userId) => {
  if (!userId) {
    const error = new Error("User ID cannot be empty!");
    error.status = 400;
    throw error;
  }

  const user = await userDb.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    const error = new Error("User not found.");
    error.status = 404;
    throw error;
  }

  return user;
};

exports.addUser = async (data) => {
  const user = await userDb.create({
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    phone: data.phone,
    address: data.address,
  });

  if (!user) {
    const error = new Error("No user found.");
    error.status = 404;
    throw error;
  }
  return { user, message: "User created successfully!" };
};

exports.updateUser = async (userId, userData) => {
  if (!userId || !userData) {
    const error = new Error("User ID and data cannot be empty!");
    error.status = 400;
    throw error;
  }

  const user = await userDb.findByPk(userId);
  if (!user) {
    const error = new Error("User not found.");
    error.status = 404;
    throw error;
  }

  await user.update(userData);

  return { user, message: "User updated successfully!" };
};

exports.deleteUser = async (userId) => {
  if (!userId) {
    const error = new Error("User ID cannot be empty!");
    error.status = 400;
    throw error;
  }

  const user = await userDb.findByPk(userId);
  if (!user) {
    const error = new Error("User not found.");
    error.status = 404;
    throw error;
  }

  await user.destroy();

  return { message: "User deleted successfully!" };
};
