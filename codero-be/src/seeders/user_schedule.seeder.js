const db = require('../models');

const seedUserSchedule = async () => {
    const userSchedules = [
        // {
        //     user_id: 1, // Replace with valid user ID
        //     schedule_id: 1, // Replace with valid schedule ID
        // },
        // {
        //     user_id: 2, // Replace with valid user ID
        //     schedule_id: 1, // Replace with valid schedule ID
        // },
        // {
        //     user_id: 3, // Replace with valid user ID
        //     schedule_id: 1, // Replace with valid schedule ID
        // },
        // {
        //     user_id: 1, // Replace with valid user ID
        //     schedule_id: 2, // Replace with valid schedule ID
        // },
    ]

    await db.userSchedule.bulkCreate(userSchedules);
    console.log("User Schedule have been seeded successfully.");
};

module.exports = seedUserSchedule;