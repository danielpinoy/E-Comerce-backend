const express = require("express");

const router = express.Router();

const itemController = require("../controllers/item.controller");

// RESTful routes for items
router.get("/", itemController.getAllItems);
router.get("/:id", itemController.getItemById);
router.post("/", itemController.addItem);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

module.exports = router;
