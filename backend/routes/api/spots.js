// backend/routes/api/session.js
const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Spot, User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//get all spots
router.get("/", async (req, res, next) => {
  try {
    const spots = await Spot.findAll();
    return res.json({
      Spots: spots,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
