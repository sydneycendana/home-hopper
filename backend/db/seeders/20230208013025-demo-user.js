"use strict";

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          firstName: "Demo",
          lastName: "User",
          email: "demo@user.com",
          username: "demo123",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Maddie",
          lastName: "Norman",
          email: "maddie@friends.com",
          username: "mnorms123",
          hashedPassword: bcrypt.hashSync("mypassword"),
        },
        {
          firstName: "Nate",
          lastName: "Porter",
          email: "nate@friends.com",
          username: "nateports",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          firstName: "Emily",
          lastName: "Jones",
          email: "emmyj@friends.com",
          username: "emmmmmyj",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
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
          [Op.in]: ["demo123","mnorms123", "nateports", "emmmmmyj", "ryanbags123"],
        },
      },
      {}
    );
  },
};
