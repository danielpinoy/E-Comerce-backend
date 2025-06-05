"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add imageUrl field
    await queryInterface.addColumn("Items", "imageUrl", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add description field
    await queryInterface.addColumn("Items", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    // Add stock field
    await queryInterface.addColumn("Items", "stock", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    // Add originalPrice field (for sale items)
    await queryInterface.addColumn("Items", "originalPrice", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });

    // Add tags field
    await queryInterface.addColumn("Items", "tags", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add colors field (to store multiple colors as JSON)
    await queryInterface.addColumn("Items", "colors", {
      type: Sequelize.JSON,
      allowNull: true,
    });

    // Add sizes field (to store multiple sizes as JSON)
    await queryInterface.addColumn("Items", "sizes", {
      type: Sequelize.JSON,
      allowNull: true,
    });

    // Add featured field
    await queryInterface.addColumn("Items", "featured", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove all added columns in reverse order
    await queryInterface.removeColumn("Items", "featured");
    await queryInterface.removeColumn("Items", "sizes");
    await queryInterface.removeColumn("Items", "colors");
    await queryInterface.removeColumn("Items", "tags");
    await queryInterface.removeColumn("Items", "originalPrice");
    await queryInterface.removeColumn("Items", "stock");
    await queryInterface.removeColumn("Items", "description");
    await queryInterface.removeColumn("Items", "imageUrl");
  },
};
