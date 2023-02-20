// backend/routes/api/session.js
const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Spot, User, Review } = require("../../db/models");
const { Sequelize } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSpot = [
  check("ownerId").exists({ checkFalsy: true }).withMessage("Invalid owner"),
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
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

// get all spots **STILL NEED AVGRATING AND PREVIEW IMAGE**
router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll();
  if (spots) {
    return res.status(200).json({
      Spots: spots,
    });
  }

  res.status(400).json({ message: "Could not find Spots" });
  next(err);
});

module.exports = router;
