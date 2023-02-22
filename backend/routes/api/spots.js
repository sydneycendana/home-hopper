// backend/routes/api/session.js
const express = require("express");

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
  requireSpotOwner,
} = require("../../utils/auth");
const { Spot, SpotImage, User, Review } = require("../../db/models");
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
      [
        Sequelize.literal(
          "(SELECT AVG(stars) FROM Reviews WHERE Reviews.spotId = Spot.id)"
        ),
        "avgRating",
      ],
      [
        Sequelize.literal(
          "(SELECT url FROM SpotImages WHERE SpotImages.spotId = Spot.id AND SpotImages.preview = true LIMIT 1)"
        ),
        "previewImage",
      ],
    ],
  });

  if (Spots) {
    return res.status(200).json({
      Spots,
    });
  }

  res.status(400).json({ message: "Could not find Spots" });
  next(err);
});

//create spot
router.post("/", validateSpot, requireAuth, async (req, res, next) => {
  if (req.user) {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    const ownerId = req.user.id;

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
  }
});

//get current users spots
router.get("/current", requireAuth, async (req, res) => {
  const Spots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
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
      [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
      [
        Sequelize.fn(
          "COALESCE",
          Sequelize.fn("MAX", Sequelize.col("SpotImages.url")),
          ""
        ),
        "previewImage",
      ],
    ],
    include: [
      {
        model: Review,
        attributes: [],
      },
      { model: SpotImage, attributes: [] },
    ],
    group: ["Spot.id", "SpotImages.id", "Reviews.spotId"],
  });

  if (Spots.length > 0) {
    return res.status(200).json({
      Spots,
    });
  }

  res.status(404).json({
    message: "No Spots found",
  });
});

//get details for specific spot
router.get("/:spotId", async (req, res, next) => {
  const spotId = req.params.spotId;

  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
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
      [
        Sequelize.literal(
          "(SELECT COUNT(stars) FROM Reviews WHERE Reviews.spotId = Spot.id)"
        ),
        "numReviews",
      ],
      [
        Sequelize.literal(
          "(SELECT AVG(stars) FROM Reviews WHERE Reviews.spotId = Spot.id)"
        ),
        "avgStarRating",
      ],
    ],
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
        as: "Owner",
      },
    ],
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  return res.status(200).json({
    spot,
  });
});

//edit a spot
router.put("/:spotId", validateSpot, requireAuth, async (req, res, next) => {
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
    return res.status(200).json({
      id: updatedSpot.id,
      ownerId: updatedSpot.ownerId,
      address: updatedSpot.address,
      city: updatedSpot.city,
      state: updatedSpot.state,
      country: updatedSpot.country,
      lat: updatedSpot.lat,
      lng: updatedSpot.lng,
      name: updatedSpot.name,
      description: updatedSpot.description,
      price: updatedSpot.price,
      createdAt: updatedSpot.createdAt,
      updatedAt: updatedSpot.updatedAt,
    });
  }
});

//add image to spot by spot id
router.post(
  "/:spotId/images",
  requireAuth,
  requireSpotOwner,
  async (req, res, next) => {
    const { url, preview } = req.body;

    const newSpotImage = await SpotImage.create({
      spotId: parseInt(req.params.spotId),
      url,
      preview,
    });

    if (newSpotImage) {
      return res.status(200).json({
        id: newSpotImage.id,
        url: newSpotImage.url,
        preview: newSpotImage.preview,
      });
    }
  }
);

module.exports = router;
