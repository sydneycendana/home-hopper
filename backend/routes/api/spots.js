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

// Validate a spot
const validateSpot = [
  // check("ownerId").exists({ checkFalsy: true }).withMessage("Invalid owner"),
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

// get all spots
router.get("/", async (req, res, next) => {
  const Spots = await Spot.findAll({
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

  const payload = Spots.map((spot) => ({
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

  res.status(200);
  res.json({ Spots: payload });
});

//create spot
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

  next(err);
});

//get current users spots
router.get("/current", requireAuth, async (req, res) => {
  const Spots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
    include: [
      {
        model: SpotImage,
        attributes: ["url"],
        // where: { preview: true },
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

  const payload = Spots.map((spot) => ({
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

  if (payload) return res.status(200).json({ Spots: payload });

  res.status(404).json({
    message: "No Spots found",
  });
});

//get details for specific spot
router.get("/:spotId", async (req, res, next) => {
  try {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    const reviews = await Review.findAll({
      where: {
        spotId: spotId,
      },
      attributes: ["stars"],
    });

    const numReviews = reviews.length;
    let sum = 0;
    for (let review of reviews) {
      sum += review.stars;
    }
    const avgStarRating = sum / numReviews;

    const spotImages = await SpotImage.findAll({
      where: {
        preview: true,
        spotId: spotId,
      },
      attributes: ["id", "url", "preview"],
    });

    const owner = await User.findOne({
      where: {
        id: spot.ownerId,
      },
      attributes: ["id", "firstName", "lastName"],
    });

    res.status(200).json({
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
      previewImage: spot.previewImage,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      numReviews: numReviews,
      avgStarRating: avgStarRating,
      SpotImages: spotImages,
      Owner: owner,
    });
  } catch (err) {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot not found",
        statusCode: 404,
      });
    }
  }
});

//edit a spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res, next) => {
  const spotId = req.params.spotId;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const ownerId = req.user.id;

  const spot = await Spot.findOne({
    where: {
      id: spotId,
      ownerId: ownerId,
    },
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
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

//delete a spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const ownerId = req.user.id;

  const spot = await Spot.findOne({
    where: {
      id: spotId,
      ownerId: ownerId,
    },
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  await spot.destroy();

  res.status(200).json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

//add image to spot by spot id
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;

  const spotId = req.params.spotId;
  const spot = await Spot.findOne({ where: { id: spotId } });
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const userId = req.user.id;
  const user = await Spot.findOne({
    where: { ownerId: userId, id: spotId },
  });

  if (!user) {
    const err = new Error("Unauthorized access");
    err.title = "Unauthorized";
    err.errors = ["Unauthorized"];
    err.status = 401;
    return next(err);
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

//get reviews by spot id ***NEED TO FINISH, RETURNING EMPTY ARRAY
router.get("/:spotId/reviews", async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findOne({ where: { id: spotId } });

  const Reviews = await Review.findAll({
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

  console.log(Reviews);

  const payload = Reviews.map((review) => ({
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
  if (payload.length > 0) return res.status(200).json({ Reviews: payload });

  res.status(404).json({
    message: "No Reviews found",
  });
});

module.exports = router;
