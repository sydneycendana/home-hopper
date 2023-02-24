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

// Validate spot
const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .toFloat()
    .isDecimal()
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .toFloat()
    .isDecimal()
    .withMessage("Longitude is not valid"),
  check("name")
    .isLength({ min: 1, max: 49 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

// Validate review
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

// Validate bookings
const validateBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Start date is requiredd"),
  check("endDate")
    .exists({ checkFalsy: true })
    .custom((endDate, { req }) => {
      const startDate = req.body.startDate;
      if (startDate && endDate && endDate <= startDate) {
        throw new Error("endDate cannot be on or before startDate");
      }
      return true;
    }),
  handleValidationErrors,
];

//******************** GETS SPOTS ********************
router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll({
    include: [
      {
        model: SpotImage,
        attributes: ["url"], //allows response to find the first image
      },
      { model: Review, attributes: [] },
    ],
    attributes: {
      include: [
        [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
      ],
    },
    group: ["Spot.id", "SpotImages.id", "Reviews.spotId"],
  });

  const allSpots = spots.map((spot) => ({
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    avgRating: spot.dataValues.avgRating,
    previewImage: spot.SpotImages[0]?.url || null,
  }));

  if (allSpots.length > 0) return res.status(200).json({ Spots: allSpots });
});

//******************** CREATE SPOT ********************
router.post("/", requireAuth, validateSpot, async (req, res, next) => {
  const ownerId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  if (spot) return res.status(201).json(spot);
});

//******************** GET CURRENT USER SPOTS ********************
router.get("/current", requireAuth, async (req, res) => {
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
    include: [
      {
        model: SpotImage,
        attributes: ["url"],
      },
      { model: Review, attributes: [] },
    ],
    attributes: {
      include: [
        [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
      ],
    },
    group: ["Spot.id", "SpotImages.id", "Reviews.spotId"],
  });

  const allSpots = spots.map((spot) => ({
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    avgRating: spot.dataValues.avgRating,
    previewImage: spot.SpotImages[0]?.url || null, //Use the first preview image or null
  }));

  if (allSpots.length > 0) return res.status(200).json({ Spots: allSpots });

  return res.status(404).json({
    message: "No Spots found",
  });
});

//******************** GET DETAILS FOR SPOT BY SPOTID ********************
router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
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
      "createdAt",
      "updatedAt",
      [Sequelize.fn("COUNT", Sequelize.col("Reviews.id")), "numReviews"],
      [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgStarRating"],
    ],
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Review,
        attributes: [],
      },
    ],
    group: ["Spot.id", "SpotImages.id", "Owner.id", "Reviews.spotId"],
  });

  if (spot) {
    return res.status(200).json(spot);
  } else {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
});

//******************** EDIT A SPOT ********************
router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
  const spotId = req.params.spotId;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const ownerId = req.user.id;

  //Check if spot exists
  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });

  if (!spot) {
    return res.status(404).json({
      message: "No spot found",
      statusCode: 404,
    });
  }
  //Check if user is authorized to post
  const authorizedUser = await Spot.findOne({
    where: { id: spotId, ownerId },
  });

  if (!authorizedUser) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  const updatedSpot = await spot.update({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  if (updatedSpot) {
    return res.status(200).json(spot);
  }
});

//******************** DELETE A SPOT ********************
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const ownerId = req.user.id;

  //Check if spot exists
  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  //Check if user is authorized to post
  const authorizedUser = await Spot.findOne({
    where: { id: spotId, ownerId },
  });

  if (!authorizedUser) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  await spot.destroy();

  return res.status(200).json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

//******************** CREATE A BOOKING ********************
router.post(
  "/:spotId/bookings",
  requireAuth,
  validateBooking,
  async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const spotId = req.params.spotId;
    const userId = req.user.id;

    //Check if spot exists
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }

    //Check if user is authorized to book
    if (spot.ownerId === userId) {
      return res.status(403).json({
        message: "Forbidden",
        statusCode: 403,
      });
    }

    //Check if there is a booking conflict
    const bookingConflict = await Booking.findOne({
      where: {
        spotId,
        [Op.and]: [
          {
            startDate: { [Op.lt]: endDate },
          },
          {
            endDate: { [Op.gt]: startDate },
          },
        ],
      },
    });

    if (bookingConflict) {
      const err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );
      err.status = 403;
      err.errors = {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      };
      next(err);
    }

    const newBooking = await Booking.create({
      spotId,
      userId,
      startDate,
      endDate,
    });

    return res.status(200).json(newBooking);
  }
);

//******************** ADD SPOTIMAGE BY SPOTID ********************
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;
  const spotId = req.params.spotId;
  const userId = req.user.id;

  //Check if spot exists
  const spot = await Spot.findOne({ where: { id: spotId } });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  //Check if user is authorized
  const authorizedUser = await Spot.findOne({
    where: { ownerId: userId, id: spotId },
  });

  if (!authorizedUser) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  const spotImage = await SpotImage.create({
    spotId: parseInt(req.params.spotId),
    url,
    preview,
  });

  if (spotImage) {
    return res.status(200).json({
      id: spotImage.id,
      url: spotImage.url,
      preview: spotImage.preview,
    });
  }
});

//******************** GET REVIEWS BY SPOTID ********************
router.get("/:spotId/reviews", async (req, res) => {
  const spotId = req.params.spotId;

  const reviews = await Review.findAll({
    where: {
      spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
    group: ["Review.id", "User.id", "ReviewImages.id"],
  });

  const allReviews = reviews.map((review) => ({
    id: review.id,
    userId: review.userId,
    spotId: review.spotId,
    review: review.review,
    stars: review.stars,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
    User: review.User,
    ReviewImages: review.ReviewImages,
  }));
  if (allReviews.length > 0)
    return res.status(200).json({ Reviews: allReviews });

  res.status(404).json({
    message: "No Reviews found",
  });
});

//******************** CREATE REVIEW BY SPOTID ********************
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const { review, stars } = req.body;
    const spotId = req.params.spotId;

    const spot = await Spot.findOne({ where: { id: spotId } });

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }

    //Check if review already exists
    const reviewExists = await Review.findOne({
      where: { userId: req.user.id, spotId },
    });

    if (reviewExists) {
      res.status(403).json({
        message: "User already has a review for this spot",
        statusCode: 403,
      });
    }

    const newReview = await Review.create({
      userId: req.user.id,
      spotId,
      review,
      stars,
    });

    return res.status(201).json(newReview);
  }
);

module.exports = router;
