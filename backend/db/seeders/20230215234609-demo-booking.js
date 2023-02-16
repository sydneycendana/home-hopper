"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 2,
          startDate: "2-13-2023",
          endDate: "2-15-2023",
        },
        {
          spotId: 2,
          userId: 3,
          startDate: "2-20-2023",
          endDate: "2-22-2023",
        },
        {
          spotId: 3,
          userId: 1,
          startDate: "2-16-2023",
          endDate: "2-19-2023",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
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
