const express = require("express");

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");

const {
  Spot,
  SpotImage,
  User,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");

const { Sequelize, Op } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//******************** DELETE REVIEW IMAGE ********************
router.delete("/:imageId", requireAuth, async (req, res) => {
  const imageId = req.params.imageId;

  //Check that image exists
  const reviewImage = await ReviewImage.findOne({
    where: { id: imageId },
    include: [
      {
        model: Review,
      },
    ],
  });

  if (!reviewImage) {
    return res.status(404).json({
      message: "Review Image couldn't be found",
      statusCode: 404,
    });
  }

  //Check if user is authorized to delete
  if (reviewImage.Review.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  await reviewImage.destroy();

  return res.status(200).json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
