"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 4,
          address: "71 Desert Ln",
          city: "Joshua Tree",
          state: "California",
          country: "United States of America",
          lat: 33.881866,
          lng: -115.900650,
          name: "Invisible House | Modern Masterpiece",
          description:
            "Welcome to Invisible House. Re-launched in November 2022 as a joint venture with Fieldtrip Hospitality.",
          price: 900,
        },
        {
          ownerId: 2,
          address: "58 Sunny Rd",
          city: "Malibu",
          state: "California",
          country: "United States of America",
          lat: 34.031246,
          lng: -118.788193,
          name: "Eagles Watch Malibu",
          description:
            "Eagle's Watch is one of Malibu's most famous houses, impossible to miss while driving the Pacific Coast Highway and designed by legendary architect Harry Gesner.",
          price: 850,
        },
        {
          ownerId: 1,
          address: "89 Founders Rd",
          city: "Bend",
          state: "Oregon",
          country: "United States of America",
          lat: 44.058174,
          lng: -121.315308,
          name: "Dome Sweet Dome",
          description:
            "Renovated & stylishly redecorated in 2019, this true-to-name Geodesic Dome sits on a private & quiet lot in the First-on-the-Hill neighborhood.",
          price: 741,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            "Invisible House | Modern Masterpiece",
            "Eagles Watch Malibu",
            "Dome Sweet Dome",
          ],
        },
      },
      {}
    );
  },
};
