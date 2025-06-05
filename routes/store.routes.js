const express = require("express");

const router = express.Router();

const storeController = require("../controllers/store.controller");

// RESTful routes for stores
router.get("/", storeController.getAllStores);
router.get("/:id", storeController.getStoreById);
router.post("/", storeController.addStore);
router.put("/:id", storeController.updateStore);
router.delete("/:id", storeController.deleteStore);

module.exports = router;
