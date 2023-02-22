// backend/routes/api/session.js
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
} = require("../../db/models");
const { Sequelize } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//get all reviews of current user
// ***NEED PREVIEW IMAGE
router.get("/current", requireAuth, async (req, res) => {
  const Reviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "description",
          "price",
        ],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
    group: ["Review.id", "User.id", "ReviewImages.id"],
  });

  const payload = Reviews.map((review) => ({
    id: review.id,
    userId: review.userId,
    spotId: review.spotId,
    review: review.review,
    stars: review.stars,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
    User: review.User,
    Spot: review.Spot,
    ReviewImages: review.ReviewImages,
  }));
  if (payload) return res.status(200).json({ Reviews: payload });

  res.status(404).json({
    message: "No Reviews found",
  });
});

module.exports = router;
