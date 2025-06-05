const orderServices = require("../services/order.services");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderServices.getAllOrders();
    res.status(200).send(orders);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while retrieving orders",
    });
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await orderServices.getOrderById(req.params.id);
    res.status(200).send(order);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while retrieving order",
    });
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    const order = await orderServices.addOrder(req.body);
    res.status(201).send(order); // 201 Created for successful creation
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while creating order",
    });
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const result = await orderServices.updateOrder(req.params.id, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while updating order",
    });
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const result = await orderServices.deleteOrder(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while deleting order",
    });
  }
};
