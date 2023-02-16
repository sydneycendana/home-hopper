"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          reviewId: 1,
          url: "fakeurl",
          preview: false,
        },
        {
          reviewId: 1,
          url: "fakeurl1",
          preview: true,
        },
        {
          reviewId: 2,
          url: "fakeurl2",
          preview: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: ["fakeurl", "fakeurl1", "fakeurl2"],
        },
      },
      {}
    );
  },
};
