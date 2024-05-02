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
    await queryInterface.bulkInsert("Stars", [
      {
        id: 1,
        name: "Sun",
        size: 1040000,
        description: "Milkyway",
        galaxyId: 1,
        createdAt,
        updatedAt,
      },
      {
        id: 2,
        name: "BeetleGuese",
        size: 2300000,
        description: "Alien Sun",
        galaxyId: 3,
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
    await queryInterface.bulkDelete("Stars", null, {});
  },
};
