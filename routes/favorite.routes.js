const express = require("express");

const router = express.Router();

const favoriteController = require("../controllers/favorite.controller");

// RESTful routes for favorites
router.get("/", favoriteController.getAllFavorites);
router.get("/:id", favoriteController.getFavoriteById);
router.post("/", favoriteController.addFavorite);
router.put("/:id", favoriteController.updateFavorite);
router.delete("/:id", favoriteController.deleteFavorite);

module.exports = router;
