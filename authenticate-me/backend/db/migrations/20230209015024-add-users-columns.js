"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //add firstName column
    await queryInterface.addColumn("Users", "firstName", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Users", "lastName", {
      type: Sequelize.STRING,
    });
    //add lastName column
  },
  async down(queryInterface, Sequelize) {
    //remove firstName
    await queryInterface.removeColumn("Users", "firstName");
    //remove lastName
    await queryInterface.removeColumn("Users", "lastName");
  },
};
