"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
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
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/f3d2386f-f8aa-4f85-9f54-0e72f23214f9.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51352477/original/2ec95769-de55-4ed8-b303-94b79304cc93.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51352477/original/dda5722a-b469-48f6-b441-3b1aa88d9512.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51352477/original/e1fac938-f9e4-4330-a281-130a9741cfaf.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51352477/original/e299fb64-0621-4964-b19e-93ff57a8d9b3.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-51352477/original/bcbd6a81-68f5-41ea-8e81-c50cf405c0c4.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/2bfa9fd4-08cc-4014-b7ec-898f80a24525.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/2ba6b606-5455-4cb6-979b-bfe52f305fc9.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/a38377fd-b3f0-4142-8876-ed87b82b6732.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/7b44dbb8-6300-411f-9865-787c7a5a3b6e.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/5ff8a888-44ef-45b5-b4d7-f8d3e31b21ed.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-39202372/original/2afce4f4-f324-4132-a8d1-724958f34a88.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-39202372/original/48408174-68e7-4431-87cc-a75d825bc3bd.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-39202372/original/e3f5bd02-3eeb-4590-a1ef-f7f49f5656c6.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-39202372/original/0910d867-d2f9-4b1f-bad6-a20f20370d49.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-39202372/original/083c71bf-f1be-4da2-a52e-65e25d8c035d.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/757b18a9-79a0-47cf-b009-80ae7b3f0dbf.jpg?im_w=720",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/3bc7d0a3-5084-4c8d-a11d-57b89db0f010.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/ea3d772d-ac56-4f18-9c44-03c4ee4ec6f3.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/83abb089-29ab-49e7-a0c8-1f49138820ab.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/5cd56fef-77ed-4882-95a3-c2867ed6cbdb.jpg?im_w=720",
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
          [Op.in]: [1, 2, 3, 4, 5, 6, 7],
        },
      },
      {}
    );
  },
};
