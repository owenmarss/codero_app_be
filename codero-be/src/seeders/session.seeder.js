const db = require('../models');

const seedSession = async () => {
    const sessions = [
        {
            id_curriculum: 1, // References "Scratch for Grade 1"
            index_session: 1,
            session_title: "Introduction to Scratch",
            session_content: "Welcome to the basics of Scratch!",
            link_source: "https://scratch.mit.edu/",
            link_video: null,
        },
        {
            id_curriculum: 1, // References "Scratch for Grade 1"
            index_session: 2,
            session_title: "Creating Your First Scratch Project",
            session_content: "Let's create your first Scratch project!",
            link_source: "https://scratch.mit.edu/",
            link_video: null,
        },
        {
            id_curriculum: 2, // References "Robotics for Beginners"
            index_session: 1,
            session_title: "Introduction to Robotics",
            session_content: "Welcome to the basics of Robotics!",
            link_source: null,
            link_video: "https://www.youtube.com/watch?v=1xqcd7j2K6A",
        },
        {
            id_curriculum: 2, // References "Robotics for Beginners"
            index_session: 2,
            session_title: "Building Your First Robot",
            session_content: "Let's build your first robot!",
            link_source: null,
            link_video: "https://www.youtube.com/watch?v=1xqcd7j2K6A",
        }
    ]

    await db.session.bulkCreate(sessions);
    console.log("Sessions have been seeded successfully.");
}

module.exports = seedSession;