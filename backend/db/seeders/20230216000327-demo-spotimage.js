"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "fakeurl3",
          preview: false,
        },
        {
          spotId: 1,
          url: "fakeurl4",
          preview: true,
        },
        {
          spotId: 3,
          url: "fakeurl5",
          preview: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: ["fakeurl3", "fakeurl4", "fakeurl5"],
        },
      },
      {}
    );
  },
};
