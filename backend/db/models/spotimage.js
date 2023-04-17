"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      SpotImage.belongsTo(models.Spot, {
        foreignKey: "spotId",
        onDelete: 'CASCADE'
      });
    }
  }
  SpotImage.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        // onDelete: "CASCADE",
      },
      url: DataTypes.STRING,
      preview: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "SpotImage",
    }
  );
  return SpotImage;
};
