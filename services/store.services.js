const db = require("../models");
const storeDb = db.Stores;

exports.getAllStores = async () => {
  const stores = await storeDb.findAll({
    include: [
      {
        model: db.Items,
        attributes: ["name", "price", "category"],
      },
    ],
  });

  if (!stores) {
    const error = new Error("No stores found.");
    error.status = 404;
    throw error;
  }

  return stores;
};

exports.getStoreById = async (storeId) => {
  if (!storeId) {
    const error = new Error("Store ID cannot be empty!");
    error.status = 400;
    throw error;
  }

  const store = await storeDb.findByPk(storeId, {
    include: [
      {
        model: db.Items,
        attributes: ["name", "price", "category"],
      },
    ],
  });

  if (!store) {
    const error = new Error("Store not found.");
    error.status = 404;
    throw error;
  }

  return store;
};

exports.addStore = async (data) => {
  const store = await storeDb.create({
    name: data.name,
    address: data.address,
    phone: data.phone,
    category: data.category,
    dateOfOrigin: data.dateOfOrigin,
    status: data.status,
  });

  if (!store) {
    const error = new Error("Failed to create store.");
    error.status = 400;
    throw error;
  }

  return { store, message: "Store created successfully!" };
};

exports.updateStore = async (storeId, storeData) => {
  if (!storeId || !storeData) {
    const error = new Error("Store ID and data cannot be empty!");
    error.status = 400;
    throw error;
  }

  const store = await storeDb.findByPk(storeId);
  if (!store) {
    const error = new Error("Store not found.");
    error.status = 404;
    throw error;
  }

  await store.update(storeData);

  return { store, message: "Store updated successfully!" };
};

exports.deleteStore = async (storeId) => {
  if (!storeId) {
    const error = new Error("Store ID cannot be empty!");
    error.status = 400;
    throw error;
  }

  const store = await storeDb.findByPk(storeId);
  if (!store) {
    const error = new Error("Store not found.");
    error.status = 404;
    throw error;
  }

  await store.destroy();

  return { message: "Store deleted successfully!" };
};
