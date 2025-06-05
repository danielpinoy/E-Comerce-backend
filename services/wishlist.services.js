const db = require("../models");
const wishlistDb = db.Wishlists;

exports.getAllWishlists = async () => {
  const wishlists = await wishlistDb.findAll({
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

  if (!wishlists) {
    const error = new Error("No wishlists found.");
    error.status = 404;
    throw error;
  }

  return wishlists;
};

exports.getWishlistById = async (wishlistId) => {
  if (!wishlistId) {
    const error = new Error("Wishlist ID cannot be empty!");
    error.status = 400;
    throw error;
  }

  const wishlist = await wishlistDb.findByPk(wishlistId, {
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

  if (!wishlist) {
    const error = new Error("Wishlist not found.");
    error.status = 404;
    throw error;
  }

  return wishlist;
};

exports.addWishlist = async (data) => {
  const wishlist = await wishlistDb.create({
    userId: data.userId,
    itemId: data.itemId,
  });

  if (!wishlist) {
    const error = new Error("Failed to create wishlist.");
    error.status = 400;
    throw error;
  }

  return { wishlist, message: "Wishlist created successfully!" };
};

exports.updateWishlist = async (wishlistId, wishlistData) => {
  if (!wishlistId || !wishlistData) {
    const error = new Error("Wishlist ID and data cannot be empty!");
    error.status = 400;
    throw error;
  }

  const wishlist = await wishlistDb.findByPk(wishlistId);
  if (!wishlist) {
    const error = new Error("Wishlist not found.");
    error.status = 404;
    throw error;
  }

  await wishlist.update(wishlistData);

  return { wishlist, message: "Wishlist updated successfully!" };
};

exports.deleteWishlist = async (wishlistId) => {
  if (!wishlistId) {
    const error = new Error("Wishlist ID cannot be empty!");
    error.status = 400;
    throw error;
  }

  const wishlist = await wishlistDb.findByPk(wishlistId);
  if (!wishlist) {
    const error = new Error("Wishlist not found.");
    error.status = 404;
    throw error;
  }

  await wishlist.destroy();

  return { message: "Wishlist deleted successfully!" };
};
