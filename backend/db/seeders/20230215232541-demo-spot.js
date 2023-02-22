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
          address: "123 Madison Ave",
          city: "New York",
          state: "New York",
          country: "United States of America",
          lat: 40.776676,
          lng: -73.971321,
          name: "Monica and Rachel's Apartment",
          description:
            "This is where Monica and Rachel lives. It is a large, open concept area on the corner of a building. The only issue is there is a man across the street who is always naked.",
          price: 250.0,
        },
        {
          ownerId: 2,
          address: "124 Madison Ave",
          city: "New York",
          state: "New York",
          country: "United States of America",
          lat: 40.776676,
          lng: -73.971321,
          name: "Chandler and Joey's Apartment",
          description:
            "This is where Chandler and Joey lives. It is a realistic looking NYC apartment and there is a duck that lives here.",
          price: 100.0,
        },
        {
          ownerId: 1,
          address: "12 Bleecker St",
          city: "New York",
          state: "New York",
          country: "United States of America",
          lat: 40.113385,
          lng: -72.971321,
          name: "Central Perk Coffee",
          description:
            "This is everyone's local coffee shop. It has a bedroom in the back.",
          price: 150.0,
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
            "Monica and Rachel's Apartment",
            "Chandler and Joey's Apartment",
            "Central Perk Coffee",
          ],
        },
      },
      {}
    );
  },
};
