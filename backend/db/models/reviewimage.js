"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    static associate(models) {
      ReviewImage.belongsTo(models.Review, {
        foreignKey: "reviewId",
        onDelete: "cascade",
      });
    }
  }
  ReviewImage.init(
    {
      reviewId: DataTypes.INTEGER,
      url: DataTypes.STRING,
      preview: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ReviewImage",
    }
  );
  return ReviewImage;
};
