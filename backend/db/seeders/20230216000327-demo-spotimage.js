"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/ce9f1e95-88e8-410b-b106-5c297aba12e4.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/72860fa4-77ef-4455-945f-0197e8b875fe.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/20c00454-1711-4ba5-9d4b-10ad9c45bd2f.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/334e3fe6-e50e-4423-a49b-10eabca6f993.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/ebad7c9d-e0ca-483c-9680-1b731cedc5db.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/2e5ce6c9-4935-49ce-891e-e6f7251a8590.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-3156442/original/26cf4e77-988f-4616-afb9-404598b81f72.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-3156442/original/c69fb019-95f0-47cf-b7f4-29e3ddd5f6c0.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/8cd65997-d77d-40f0-a41c-18ef2559d881.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-3156442/original/36403ece-4827-478e-a980-34c6688bb57b.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/1e16f2f4-1256-44cb-a0f2-85aa57672a45.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/d8861dba-37c3-483b-98a4-9c199d60476b.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/4f0cdef6-d0be-423b-9b03-7663e28c49f7.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-37815537/original/c523aa70-0e0c-462b-8eae-9235011f80dc.jpeg?im_w=1440",
          preview: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: {
          [Op.in]: [1, 2 ,3],
        },
      },
      {}
    );
  },
};
