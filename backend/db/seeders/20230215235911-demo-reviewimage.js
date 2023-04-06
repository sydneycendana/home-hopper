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
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/4a2c6a70-6188-47db-bac8-0fb0f3ce6ed4.jpeg?im_w=1440",
          preview: false,
        },
        {
          reviewId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/f375201e-bd47-4028-b732-5c8680a4fdc9.jpeg?im_w=1440",
          preview: true,
        },
        {
          reviewId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-3156442/original/c4e0b39b-2209-4a14-a57d-c7d103d91a15.jpeg?im_w=1440",
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
