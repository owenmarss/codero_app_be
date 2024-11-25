const db = require("../models");

const seedMessages = async () => {
    // await db.sequelize.sync({ alter: true }); // This will drop the table if it already exists
    const messages = [
        {
            id_sender: 1, // ID of the sender from the `users` table
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "First Test Message",
            content: "This is the content of the first test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Second Test Message",
            content: "This is the content of the second test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Third Test Message",
            content: "This is the content of the third test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Fourth Test Message",
            content: "This is the content of the fourth test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Fifth Test Message",
            content: "This is the content of the fifth test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Sixth Test Message",
            content: "This is the content of the sixth test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Seventh Test Message",
            content: "This is the content of the seventh test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Eight Test Message",
            content: "This is the content of the eight test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Ninth Test Message",
            content: "This is the content of the ninth test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Tenth Test Message",
            content: "This is the content of the tenth test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Eleventh Test Message",
            content: "This is the content of the eleventh test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Twelfth Test Message",
            content: "This is the content of the Twelfth test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Thirteenth Test Message",
            content: "This is the content of the Thirteenth test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Fourteenth Test Message",
            content: "This is the content of the Fourteenth test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Fifteenth Test Message",
            content: "This is the content of the Fifteenth test message.",
        },
        {
            id_sender: 2, // Another sender's ID
            send_date: new Date().toISOString().split("T")[0],
            send_time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
            }),
            subject: "Sixteenth Test Message",
            content: "This is the content of the Sixteenth test message.",
        },
    ];

    await db.message.bulkCreate(messages);
    console.log("Messages have been seeded successfully.");
};

module.exports = seedMessages;
