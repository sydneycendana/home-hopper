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

//add an image to review
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const { url } = req.body;
  const reviewId = req.params.reviewId;

  const review = await Review.findOne({
    where: {
      id: reviewId,
      userId: req.user.id,
    },
  });

  if (!review) {
    return res.status(404).json({
      message: "No Reviews found",
    });
  }

  const reviewImages = await ReviewImage.findAll({
    where: { reviewId },
  });

  console.log(reviewImages);

  if (reviewImages.length >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 403,
    });
  }

  const newReviewImage = await ReviewImage.create({
    reviewId,
    url,
  });

  return res.status(200).json({
    id: newReviewImage.id,
    url: newReviewImage.url,
  });
});

module.exports = router;
