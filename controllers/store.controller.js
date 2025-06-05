const storeServices = require("../services/store.services");

exports.getAllStores = async (req, res, next) => {
  try {
    const stores = await storeServices.getAllStores();
    res.status(200).send(stores);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while retrieving stores",
    });
  }
};

exports.getStoreById = async (req, res, next) => {
  try {
    const store = await storeServices.getStoreById(req.params.id);
    res.status(200).send(store);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while retrieving store",
    });
  }
};

exports.addStore = async (req, res, next) => {
  try {
    const store = await storeServices.addStore(req.body);
    res.status(201).send(store); // 201 Created for successful creation
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while creating store",
    });
  }
};

exports.updateStore = async (req, res, next) => {
  try {
    const result = await storeServices.updateStore(req.params.id, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while updating store",
    });
  }
};

exports.deleteStore = async (req, res, next) => {
  try {
    const result = await storeServices.deleteStore(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "An error occurred while deleting store",
    });
  }
};
