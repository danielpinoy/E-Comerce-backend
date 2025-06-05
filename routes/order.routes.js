const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order.controller");

// RESTful routes for orders
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.addOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
