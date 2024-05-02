"use strict";
const [createdAt, updatedAt] = [new Date(), new Date()];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Planets", [
      {
        name: "Mars",
        size: 40000,
        description: "Home",
        starId: 1,
        createdAt,
        updatedAt,
      },
      {
        name: "Earth",
        size: 30000,
        description: "Alien Home",
        starId: 1,
        createdAt,
        updatedAt,
      },
      {
        name: "Pluto",
        size: 1000,
        description: "Rock Floating",
        starId: 1,
        createdAt,
        updatedAt,
      },
      {
        name: "Saturn",
        size: 1230000,
        description: "Gas giant with rings",
        starId: 1,
        createdAt,
        updatedAt,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Planets", null, {});
  },
};
