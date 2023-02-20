// backend/routes/api/session.js
const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Spot, User, Review } = require("../../db/models");
const { Sequelize } = require("sequelize");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//get all spots
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
