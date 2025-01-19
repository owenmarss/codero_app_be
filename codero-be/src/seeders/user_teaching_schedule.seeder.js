const db = require('../models');

const seedUserTeachingSchedule = async () => {
    const userTeachingSchedules = [
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

    await db.userTeachingSchedule.bulkCreate(userTeachingSchedules  );
    console.log("User Schedule have been seeded successfully.");
};

module.exports = seedUserTeachingSchedule;