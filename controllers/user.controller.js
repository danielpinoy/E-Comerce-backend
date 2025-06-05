const userServices = require("../services/user.services");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while retrieving users",
    });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userServices.getUserById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while retrieving user",
    });
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const user = await userServices.addUser(req.body);
    res.status(201).send(user); // 201 Created for successful creation
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while creating user",
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const result = await userServices.updateUser(req.params.id, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while updating user",
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const result = await userServices.deleteUser(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while deleting user",
    });
  }
};
