"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 2,
          spotId: 1,
          review: "This was a once in a lifetime experience. The house is truly a modern piece of art.",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 2,
          review: "Beautiful location and architecture, but it was messy on arrival.",
          stars: 3,
        },
        {
          userId: 1,
          spotId: 3,
          review: "This was the perfect place for a weekend getaway with my dog. My only complaint is the poor wifi connection.",
          stars: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};
