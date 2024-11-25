const db = require('../models');

const seedCurriculum = async () => {
    const curriculums = [
        {
            curriculum_title: "Scratch for Grade 1",
            curriculum_type: "Coding",
            tools: null,
            total_session: 12,
        },
        {
            curriculum_title: "Roblox for Grade 2",
            curriculum_type: "Coding",
            tools: null,
            total_session: 12,
        },
        {
            curriculum_title: "Robotics for Beginners",
            curriculum_type: "Robotic",
            tools: "LEGO Mindstorms",
            total_session: 10,
        },
        {
            curriculum_title: "Arduino for Intermediate",
            curriculum_type: "Robotic",
            tools: "LEGO Mindstorms",
            total_session: 10,
        },
    ]

    await db.curriculum.bulkCreate(curriculums);
    console.log("Curriculums have been seeded successfully.");
}

module.exports = seedCurriculum;