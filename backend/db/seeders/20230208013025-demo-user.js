"use strict";

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          // id: 1,
          firstName: "Maddie",
          lastName: "Norman",
          email: "maddie@friends.com",
          username: "mnorms123",
          hashedPassword: bcrypt.hashSync("mypassword"),
        },
        {
          // id: 2,
          firstName: "Nate",
          lastName: "Porter",
          email: "nate@friends.com",
          username: "nateports",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          // id: 3,
          firstName: "Emily",
          lastName: "Jones",
          email: "emmyj@friends.com",
          username: "emmmmmyj",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          // id: 4,
          firstName: "Ryan",
          lastName: "Bagsdasarian",
          email: "ryanbags@friends.com",
          username: "ryanbags123",
          hashedPassword: bcrypt.hashSync("password1234"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: ["mnorms123", "nateports", "emmmmmyj", "ryanbags123"],
        },
      },
      {}
    );
  },
};
