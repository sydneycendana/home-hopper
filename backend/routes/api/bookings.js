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

//******************** GET USERS BOOKINGS ********************
router.get("/current", requireAuth, async (req, res) => {
  const currentUsersBookings = await Booking.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: SpotImage,
            attributes: ["url"],
            where: { preview: true },
            required: false,
          },
        ],
      },
    ],
  });

  if (currentUsersBookings.length > 0) {
    const bookingsData = currentUsersBookings.map((booking) => {
      const {
        id,
        spotId,
        userId,
        startDate,
        endDate,
        createdAt,
        updatedAt,
        Spot,
      } = booking.toJSON();

      const previewImage =
        Spot.SpotImages.length > 0 ? Spot.SpotImages[0].url : null;

      return {
        id,
        spotId,
        Spot: {
          id: Spot.id,
          ownerId: Spot.ownerId,
          address: Spot.address,
          city: Spot.city,
          state: Spot.state,
          country: Spot.country,
          lat: Spot.lat,
          lng: Spot.lng,
          name: Spot.name,
          price: Spot.price,
          previewImage,
        },
        userId,
        startDate,
        endDate,
        createdAt,
        updatedAt,
      };
    });

    return res.status(200).json({ Bookings: bookingsData });
  }

  const err = new Error("Reviews couldn't be found");
  err.statusCode = 404;
  return next(err);
});

module.exports = router;
