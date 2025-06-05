const db = require("../models");
const itemDb = db.Items;

exports.getAllItems = async () => {
  const items = await itemDb.findAll({
    include: [
      {
        model: db.Stores,
        attributes: ["name", "address", "category"],
      },
    ],
  });

  if (!items) {
    const error = new Error("No items found.");
    error.status = 404;
    throw error;
  }

  return items;
};

exports.getItemById = async (itemId) => {
  if (!itemId) {
    const error = new Error("Item ID cannot be empty!");
    error.status = 400;
    throw error;
  }

  const item = await itemDb.findByPk(itemId, {
    include: [
      {
        model: db.Stores,
        attributes: ["name", "address", "category"],
      },
    ],
  });

  if (!item) {
    const error = new Error("Item not found.");
    error.status = 404;
    throw error;
  }

  return item;
};

exports.addItem = async (data) => {
  const item = await itemDb.create({
    name: data.name,
    price: data.price,
    gender: data.gender,
    category: data.category,
    color: data.color,
    size: data.size,
    weight: data.weight,
    storeId: data.storeId,
  });

  if (!item) {
    const error = new Error("Failed to create item.");
    error.status = 400;
    throw error;
  }

  return { item, message: "Item created successfully!" };
};

exports.updateItem = async (itemId, itemData) => {
  if (!itemId || !itemData) {
    const error = new Error("Item ID and data cannot be empty!");
    error.status = 400;
    throw error;
  }

  const item = await itemDb.findByPk(itemId);
  if (!item) {
    const error = new Error("Item not found.");
    error.status = 404;
    throw error;
  }

  await item.update(itemData);

  return { item, message: "Item updated successfully!" };
};

exports.deleteItem = async (itemId) => {
  if (!itemId) {
    const error = new Error("Item ID cannot be empty!");
    error.status = 400;
    throw error;
  }

  const item = await itemDb.findByPk(itemId);
  if (!item) {
    const error = new Error("Item not found.");
    error.status = 404;
    throw error;
  }

  await item.destroy();

  return { message: "Item deleted successfully!" };
};
