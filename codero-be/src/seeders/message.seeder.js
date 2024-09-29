const db = require("../models");

const seedMessages = async () => {
    // await db.sequelize.sync({ alter: true }); // This will drop the table if it already exists
    const messages = [
        {
            id_pengirim: 1, // ID of the sender from the `users` table
            tanggal_dikirim: new Date().toISOString().split("T")[0],
            waktu_dikirim: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "First Test Message",
            isi_pesan: "This is the content of the first test message.",
        },
        {
            id_pengirim: 2, // Another sender's ID
            tanggal_dikirim: new Date().toISOString().split("T")[0],
            waktu_dikirim: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Second Test Message",
            isi_pesan: "This is the content of the second test message.",
        },
    ];

    await db.message.bulkCreate(messages);
    console.log("Messages have been seeded successfully.");
};

module.exports = seedMessages;
