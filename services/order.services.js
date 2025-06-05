const db = require("../models");
const orderDb = db.Orders;

exports.getAllOrders = async () => {
  const orders = await orderDb.findAll({
    include: [
      {
        model: db.Users,
        attributes: ["firstName", "lastName", "email"],
      },
      {
        model: db.Items,
        attributes: ["name", "price", "category"],
      },
    ],
  });

  if (!orders) {
    const error = new Error("No orders found.");
    error.status = 404;
    throw error;
  }

  return orders;
};

exports.getOrderById = async (orderId) => {
  if (!orderId) {
    const error = new Error("Order ID cannot be empty!");
    error.status = 400;
    throw error;
  }

  const order = await orderDb.findByPk(orderId, {
    include: [
      {
        model: db.Users,
        attributes: ["firstName", "lastName", "email"],
      },
      {
        model: db.Items,
        attributes: ["name", "price", "category"],
      },
    ],
  });

  if (!order) {
    const error = new Error("Order not found.");
    error.status = 404;
    throw error;
  }

  return order;
};

exports.addOrder = async (data) => {
  const order = await orderDb.create({
    userId: data.userId,
    itemId: data.itemId,
    totalAmount: data.totalAmount,
    dateItWasOrdered: data.dateItWasOrdered,
    expectedDeliveryDate: data.expectedDeliveryDate,
    totalWeight: data.totalWeight,
  });

  if (!order) {
    const error = new Error("Failed to create order.");
    error.status = 400;
    throw error;
  }

  return { order, message: "Order created successfully!" };
};

exports.updateOrder = async (orderId, orderData) => {
  if (!orderId || !orderData) {
    const error = new Error("Order ID and data cannot be empty!");
    error.status = 400;
    throw error;
  }

  const order = await orderDb.findByPk(orderId);
  if (!order) {
    const error = new Error("Order not found.");
    error.status = 404;
    throw error;
  }

  await order.update(orderData);

  return { order, message: "Order updated successfully!" };
};

exports.deleteOrder = async (orderId) => {
  if (!orderId) {
    const error = new Error("Order ID cannot be empty!");
    error.status = 400;
    throw error;
  }

  const order = await orderDb.findByPk(orderId);
  if (!order) {
    const error = new Error("Order not found.");
    error.status = 404;
    throw error;
  }

  await order.destroy();

  return { message: "Order deleted successfully!" };
};
