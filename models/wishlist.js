"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlists.belongsTo(models.Users, { foreignKey: "userId" });
      Wishlists.belongsTo(models.Items, { foreignKey: "itemId" });
    }
  }
  Wishlists.init(
    {
      userId: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Wishlists",
    }
  );
  return Wishlists;
};
