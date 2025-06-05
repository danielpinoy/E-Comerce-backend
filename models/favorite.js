"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorites.belongsTo(models.Users, { foreignKey: "userId" });
      Favorites.belongsTo(models.Items, { foreignKey: "itemId" });
    }
  }
  Favorites.init(
    {
      userId: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Favorites",
    }
  );
  return Favorites;
};
