const db = require("../models");

const seedMessageRecipients = async () => {
    // await db.sequelize.sync({ alter: true }); // This will drop the table if it already exists
    const messageRecipients = [
        {
            id_message: 1, // ID of the message from the `messages` table
            id_penerima: 2, // ID of the recipient from the `users` table
            status: "Belum Dibaca",
        },
        {
            id_message: 2, // Another message's ID
            id_penerima: 1, // Another recipient's ID
            status: "Belum Dibaca",
        },
        {
            id_message: 3, // Another message's ID
            id_penerima: 1, // Another recipient's ID
            status: "Belum Dibaca",
        },
        {
            id_message: 4, // Another message's ID
            id_penerima: 1, // Another recipient's ID
            status: "Belum Dibaca",
        },
        {
            id_message: 5, // Another message's ID
            id_penerima: 1, // Another recipient's ID
            status: "Belum Dibaca",
        },
        {
            id_message: 6, // Another message's ID
            id_penerima: 1, // Another recipient's ID
            status: "Belum Dibaca",
        },
        {
            id_message: 7, // Another message's ID
            id_penerima: 1, // Another recipient's ID
            status: "Belum Dibaca",
        },
        {
            id_message: 8, // Another message's ID
            id_penerima: 1, // Another recipient's ID
            status: "Belum Dibaca",
        },
        {
            id_message: 9, // Another message's ID
            id_penerima: 1, // Another recipient's ID
            status: "Belum Dibaca",
        },
        {
            id_message: 10, // Another message's ID
            id_penerima: 1, // Another recipient's ID
            status: "Belum Dibaca",
        },
    ];

    await db.messageRecipient.bulkCreate(messageRecipients);
    console.log("Message recipients have been seeded successfully.");
};

module.exports = seedMessageRecipients;
