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

// Validate bookings
const validateBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Start date is required"),
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

//******************** GET USERS BOOKINGS ********************
router.get("/current", requireAuth, async (req, res, next) => {
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

//******************** EDIT BOOKING ********************
router.put(
  "/:bookingId",
  requireAuth,
  validateBooking,
  async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const { startDate, endDate } = req.body;

    //Check if booking exists
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }

    //Check if user is authorized
    if (booking.userId !== req.user.id) {
      return res.status(403).json({
        message: "Forbidden",
        statusCode: 403,
      });
    }

    //Check if booking is past end date
    const bookingEndDate = Date.parse(booking.endDate);
    const currentDate = new Date();

    if (bookingEndDate < currentDate) {
      return res.status(403).json({
        message: "Past bookings can't be modified",
        statusCode: 403,
      });
    }

    //Check if there is a booking conflict
    const bookingConflict = await Booking.findOne({
      where: {
        spotId: booking.spotId,
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
      return next(err);
    }

    const updatedBooking = await booking.update({
      startDate,
      endDate,
    });

    if (updatedBooking) {
      return res.status(200).json(updatedBooking);
    }
  }
);

//******************** DELETE BOOKING ********************
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const bookingId = req.params.bookingId;

  //Check if booking exists
  const booking = await Booking.findOne({
    where: { id: bookingId },
    include: [
      {
        model: Spot,
        attributes: {
          include: ["ownerId"],
        },
      },
    ],
  });

  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  //Check if user is authorized to delete
  if (req.user.id === booking.Spot.ownerId || req.user.id === booking.userId) {
    const bookingStartDate = Date.parse(booking.startDate);
    const currentDate = new Date();

    //Check if booking has already started
    if (bookingStartDate < currentDate) {
      return res.status(403).json({
        message: "Bookings that have been started can't be deleted",
        statusCode: 403,
      });
    }

    await booking.destroy();

    return res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

module.exports = router;
