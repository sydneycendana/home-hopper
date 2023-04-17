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
          ownerId: 2,
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
        {
          ownerId: 1,
          address: "90 Lake Dr",
          city: "Brinnon",
          state: "Washington",
          country: "United States of America",
          lat: 22.058174,
          lng: 114.8918,
          name: "Weather-N-Heights",
          description:
            "Located just 60 miles north of Olympia on the on the scenic Hood Canal, Weather-N-Heights resort was lovingly built and enjoyed by my parents for many years.",
          price: 340,
        },
        {
          ownerId: 1,
          address: "55 Crystal Ride",
          city: "Superior",
          state: "Montana",
          country: "United States of America",
          lat: 47.1916,
          lng: -123.475890,
          name: "Alpine Falls Ranch",
          description:
            "Come enjoy the beauty, privacy and seclusion of Mountain View Villa at Alpine Falls Ranch, adjacent to the LoLo National Forest and steps away from the Clark Fork river.",
          price: 3990,
        },
        {
          ownerId: 1,
          address: "2006 30th St",
          city: "La Jolla",
          state: "California",
          country: "United States of America",
          lat: 32.8328,
          lng: 117.2713,
          name: "Beach Bungalow",
          description:
            "Walk to the beach with your coffee in the morning, watch a beautiful sunset with a glass of wine in the evening, and fall asleep to the sound of the surf at night.",
          price: 240,
        },
        {
          ownerId: 2,
          address: "73 Country Club Rd",
          city: "Santa Barbara",
          state: "California",
          country: "United States of America",
          lat: 32.8328,
          lng: 117.2713,
          name: "Tropical Garden Cottage",
          description:
            "Keep it simple at this peaceful and centrally-located place.",
          price: 130,
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
            "Weather-N-Heights",
            "Alpine Falls Ranch",
            "Beach Bungalow",
            "Tropical Garden Cottage"
          ],
        },
      },
      {}
    );
  },
};
