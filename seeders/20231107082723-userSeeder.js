'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users", [
      {
        name: "admin1",
        email: "admin1@email.com",
        password: "12345678",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "user2",
        email: "user2@email.com",
        password: "87654321",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
      {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  }
};
