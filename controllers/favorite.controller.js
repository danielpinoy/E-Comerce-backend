const favoriteServices = require("../services/favorite.services");

exports.getAllFavorites = async (req, res, next) => {
  try {
    const favorites = await favoriteServices.getAllFavorites();
    res.status(200).send(favorites);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while retrieving favorites",
    });
  }
};

exports.getFavoriteById = async (req, res, next) => {
  try {
    const favorite = await favoriteServices.getFavoriteById(req.params.id);
    res.status(200).send(favorite);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while retrieving favorite",
    });
  }
};

exports.addFavorite = async (req, res, next) => {
  try {
    const favorite = await favoriteServices.addFavorite(req.body);
    res.status(201).send(favorite); // 201 Created for successful creation
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while creating favorite",
    });
  }
};

exports.updateFavorite = async (req, res, next) => {
  try {
    const result = await favoriteServices.updateFavorite(
      req.params.id,
      req.body
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while updating favorite",
    });
  }
};

exports.deleteFavorite = async (req, res, next) => {
  try {
    const result = await favoriteServices.deleteFavorite(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while deleting favorite",
    });
  }
};
