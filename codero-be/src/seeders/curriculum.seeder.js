const db = require('../models');

const seedCurriculum = async () => {
    const curriculums = [
        {
            curriculum_title: "Scratch for Grade 1",
            curriculum_type: "Coding",
            technology: "Scratch",
            tools: null,
            total_session: 12,
        },
        {
            curriculum_title: "Roblox for Grade 2",
            curriculum_type: "Coding",
            technology: "Roblox Studio",
            tools: null,
            total_session: 12,
        },
        {
            curriculum_title: "Python for Grade 3",
            curriculum_type: "Coding",
            technology: "Python",
            tools: null,
            total_session: 12,
        },
        {
            curriculum_title: "HTML for Grade 4",
            curriculum_type: "Coding",
            technology: "HTML",
            tools: null,
            total_session: 12,
        },
        {
            curriculum_title: "CSS for Grade 5",
            curriculum_type: "Coding",
            technology: "CSS",
            tools: null,
            total_session: 12,
        },
        {
            curriculum_title: "JavaScript for Grade 6",
            curriculum_type: "Coding",
            technology: "JavaScript",
            tools: null,
            total_session: 12,
        },
        {
            curriculum_title: "C++ for Grade 7",
            curriculum_type: "Coding",
            technology: "C++",
            tools: null,
            total_session: 12,
        },
        {
            curriculum_title: "Robotics for Beginners",
            curriculum_type: "Robotic",
            technology: "LEGO Mindstorms",
            tools: "LEGO Mindstorms",
            total_session: 10,
        },
        {
            curriculum_title: "Arduino for Intermediate",
            curriculum_type: "Robotic",
            technology: "Arduino",
            tools: "LEGO Mindstorms",
            total_session: 10,
        },
    ]

    await db.curriculum.bulkCreate(curriculums);
    console.log("Curriculums have been seeded successfully.");
}

module.exports = seedCurriculum;