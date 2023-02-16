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
          firstName: "Rachel",
          lastName: "Green",
          email: "rachel@friends.com",
          username: "rachelgreen",
          hashedPassword: bcrypt.hashSync("mypassword"),
        },
        {
          firstName: "Chandler",
          lastName: "Bing",
          email: "chandler@friends.com",
          username: "bing123",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          firstName: "Joey",
          lastName: "Tribbiani",
          email: "joey@friends.com",
          username: "joey",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Monica",
          lastName: "Geller",
          email: "monica@friends.com",
          username: "monicageller",
          hashedPassword: bcrypt.hashSync("monica!"),
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
          [Op.in]: ["rachelgreen", "bing123", "joey", "monicageller"],
        },
      },
      {}
    );
  },
};
