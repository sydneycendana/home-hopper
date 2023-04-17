"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 2,
          spotId: 1,
          review: "This was a once in a lifetime experience. The house is truly a modern piece of art.",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 2,
          review: "Beautiful location and architecture, but it was messy on arrival.",
          stars: 3,
        },
        {
          userId: 1,
          spotId: 2,
          review: "My best friend and I had the best time visiting. Thank you so much!",
          stars: 5,
        },
        {
          userId: 1,
          spotId: 3,
          review: "This was the perfect place for a weekend getaway with my dog. My only complaint is the poor wifi connection.",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 4,
          review: "The home was a wonderful place to stay on this lake. I will be coming back!",
          stars: 5,
        },
        {
          userId: 4,
          spotId: 5,
          review: "Such a luxurious home. Had a great experience and especially loved the private cooked meals.",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 6,
          review: "A short walk to the beach and plenty of things to do nearby.",
          stars: 4,
        },
        {
          userId: 3,
          spotId: 5,
          review: "Felt overpriced, but still a lovely spot.",
          stars: 3,
        },
        {
          userId: 1,
          spotId: 5,
          review: "The property is so big, I could not hear or see anything for miles. Very relaxing vacation at the Alpine Rach.",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 6,
          review: "The Beach Bungalow was the perfect place for a solo vacation.",
          stars: 5,
        },
        {
          userId: 1,
          spotId: 7,
          review: "I wanted to go for a solo vacation and this was the perfect place. The perfect place to unwind.",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 7,
          review: "The owners of the home live in the front of the guesthouse. It was a little bit too close for comfort but Maddie was lovely.",
          stars: 4,
        },
        {
          userId: 1,
          spotId: 7,
          review: "I wanted to go for a solo vacation and this was the right choice. The perfect place to unwind.",
          stars: 5,
        },
        {
          userId: 5,
          spotId: 7,
          review: "Felt like I was somewhere far away from LA. I loved it!",
          stars: 5,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: {
          [Op.in]: [1, 2, 3, 4, 5, 6, 7],
        },
      },
      {}
    );
  },
};
