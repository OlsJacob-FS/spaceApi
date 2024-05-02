"use strict";
const [createdAt, updatedAt] = [new Date(), new Date()];
/** @type {import('sequelize-cli').Migration} */
(
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
      await queryInterface.bulkInsert("Galaxies", [
        {
          id: 1,
          name: "Milky Way",
          size: 410,
          description: "Home to our solar System",
          createdAt,
          updatedAt,
        },
        {
          id: 2,
          name: "Large Magellanic Cloud",
          size: 1320,
          description: "Alien Home solar system",
          createdAt,
          updatedAt,
        },
        {
          id: 3,
          name: "Small Magellanic Cloud",
          size: 990,
          description: "Alien Home solar system",
          createdAt,
          updatedAt,
        },
        {
          id: 4,
          name: "Andromeda Galaxy",
          size: 1400,
          description: "Alien Home solar system",
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
      await queryInterface.bulkDelete("Galaxies", null, {});
    },
  }
);
