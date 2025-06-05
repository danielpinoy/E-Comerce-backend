"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Items.belongsTo(models.Stores, { foreignKey: "storeId" });
      Items.hasMany(models.Orders, { foreignKey: "itemId" });
      Items.hasMany(models.Wishlists, { foreignKey: "itemId" });
      Items.hasMany(models.Favorites, { foreignKey: "itemId" });
    }
  }

  Items.init(
    {
      // Basic product info
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      // Pricing
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      originalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      // Product details
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      // Inventory
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      // Legacy single values (keep for backward compatibility)
      color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // New multi-value fields (matches AddProduct form)
      colors: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      sizes: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },

      // Media and metadata
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tags: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      featured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      // Store association
      storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Stores",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Items",
      tableName: "Items",
      timestamps: true, // This adds createdAt and updatedAt
    }
  );

  return Items;
};
