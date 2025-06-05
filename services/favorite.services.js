const db = require("../models");
const favoriteDb = db.Favorites;

exports.getAllFavorites = async () => {
  const favorites = await favoriteDb.findAll({
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

  if (!favorites) {
    const error = new Error("No favorites found.");
    error.status = 404;
    throw error;
  }

  return favorites;
};

exports.getFavoriteById = async (favoriteId) => {
  if (!favoriteId) {
    const error = new Error("Favorite ID cannot be empty!");
    error.status = 400;
    throw error;
  }

  const favorite = await favoriteDb.findByPk(favoriteId, {
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

  if (!favorite) {
    const error = new Error("Favorite not found.");
    error.status = 404;
    throw error;
  }

  return favorite;
};

exports.addFavorite = async (data) => {
  const favorite = await favoriteDb.create({
    userId: data.userId,
    itemId: data.itemId,
  });

  if (!favorite) {
    const error = new Error("Failed to create favorite.");
    error.status = 400;
    throw error;
  }

  return { favorite, message: "Favorite created successfully!" };
};

exports.updateFavorite = async (favoriteId, favoriteData) => {
  if (!favoriteId || !favoriteData) {
    const error = new Error("Favorite ID and data cannot be empty!");
    error.status = 400;
    throw error;
  }

  const favorite = await favoriteDb.findByPk(favoriteId);
  if (!favorite) {
    const error = new Error("Favorite not found.");
    error.status = 404;
    throw error;
  }

  await favorite.update(favoriteData);

  return { favorite, message: "Favorite updated successfully!" };
};

exports.deleteFavorite = async (favoriteId) => {
  if (!favoriteId) {
    const error = new Error("Favorite ID cannot be empty!");
    error.status = 400;
    throw error;
  }

  const favorite = await favoriteDb.findByPk(favoriteId);
  if (!favorite) {
    const error = new Error("Favorite not found.");
    error.status = 404;
    throw error;
  }

  await favorite.destroy();

  return { message: "Favorite deleted successfully!" };
};
