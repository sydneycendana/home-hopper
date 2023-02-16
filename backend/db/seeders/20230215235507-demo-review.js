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
          id: 1,
          userId: 2,
          spotId: 1,
          review: "It was a great spot!",
          stars: 5,
        },
        {
          id: 2,
          userId: 3,
          spotId: 2,
          review: "The description was not accurate.",
          stars: 3,
        },
        {
          id: 3,
          userId: 1,
          spotId: 3,
          review: "Location is great!",
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
