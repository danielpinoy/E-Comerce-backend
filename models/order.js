"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.Users, { foreignKey: "userId" });
      Orders.belongsTo(models.Items, { foreignKey: "itemId" });
    }
  }
  Orders.init(
    {
      userId: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
      totalAmount: DataTypes.DECIMAL,
      dateItWasOrdered: DataTypes.DATE,
      expectedDeliveryDate: DataTypes.DATE,
      totalWeight: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
