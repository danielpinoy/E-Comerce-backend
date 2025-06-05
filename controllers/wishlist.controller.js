const wishlistServices = require("../services/wishlist.services");

exports.getAllWishlists = async (req, res, next) => {
  try {
    const wishlists = await wishlistServices.getAllWishlists();
    res.status(200).send(wishlists);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while retrieving wishlists",
    });
  }
};

exports.getWishlistById = async (req, res, next) => {
  try {
    const wishlist = await wishlistServices.getWishlistById(req.params.id);
    res.status(200).send(wishlist);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while retrieving wishlist",
    });
  }
};

exports.addWishlist = async (req, res, next) => {
  try {
    const wishlist = await wishlistServices.addWishlist(req.body);
    res.status(201).send(wishlist); // 201 Created for successful creation
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while creating wishlist",
    });
  }
};

exports.updateWishlist = async (req, res, next) => {
  try {
    const result = await wishlistServices.updateWishlist(
      req.params.id,
      req.body
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while updating wishlist",
    });
  }
};

exports.deleteWishlist = async (req, res, next) => {
  try {
    const result = await wishlistServices.deleteWishlist(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while deleting wishlist",
    });
  }
};
