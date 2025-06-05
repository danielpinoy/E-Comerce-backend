const itemServices = require("../services/item.services");

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await itemServices.getAllItems();
    res.status(200).send(items);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while retrieving items",
    });
  }
};

exports.getItemById = async (req, res, next) => {
  try {
    const item = await itemServices.getItemById(req.params.id);
    res.status(200).send(item);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while retrieving item",
    });
  }
};

exports.addItem = async (req, res, next) => {
  try {
    const item = await itemServices.addItem(req.body);
    res.status(201).send(item); // 201 Created for successful creation
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while creating item",
    });
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const result = await itemServices.updateItem(req.params.id, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while updating item",
    });
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const result = await itemServices.deleteItem(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while deleting item",
    });
  }
};
