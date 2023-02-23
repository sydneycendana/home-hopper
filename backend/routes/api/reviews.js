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

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

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
    group: ["Review.id", "User.id", "Spot.id", "ReviewImages.id"],
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

//******************** EDIT REVIEW ********************
router.put(
  "/:reviewId",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const { review, stars } = req.body;
    const reviewId = req.params.reviewId;
    const userId = req.user.id;

    //Check if review exists
    const existingReview = await Review.findOne({
      where: {
        id: reviewId,
      },
    });

    if (!existingReview) {
      return res.status(404).json({
        message: "Review couldn't be found",
        statusCode: 404,
      });
    }

    //Check if user is authorized
    const authorizedUser = await Review.findOne({
      where: {
        id: reviewId,
        userId,
      },
    });

    if (!authorizedUser) {
      return res.status(403).json({
        message: "Forbidden",
        statusCode: 403,
      });
    }

    const updatedReview = await existingReview.update({
      review,
      stars,
    });

    return res.status(200).json(updatedReview);
  }
);

//******************** DELETE REVIEW ********************
router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const userId = req.user.id;

  //Check if review exists
  const existingReview = await Review.findOne({
    where: {
      id: reviewId,
    },
  });

  if (!existingReview) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  //Check if user is authorized
  const authorizedUser = await Review.findOne({
    where: {
      id: reviewId,
      userId,
    },
  });

  if (!authorizedUser) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  await existingReview.destroy();

  res.status(200).json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

//******************** ADD REVIEWIMAGE BY REVIEWID ********************
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const { url } = req.body;
  const reviewId = req.params.reviewId;

  //Check if review exists
  const review = await Review.findOne({ where: { id: reviewId } });

  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  //Check if user is authorized
  const authorizedUser = await Review.findOne({
    where: {
      id: reviewId,
      userId: req.user.id,
    },
  });

  if (!authorizedUser) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
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
