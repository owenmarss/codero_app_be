const db = require('../models');

const seedPertemuan = async () => {
    const pertemuans = [
        {
            id_materi: 1, // References "Scratch for Grade 1"
            index_pertemuan: 1,
            judul_pertemuan: "Introduction to Scratch",
            isi_pertemuan: "Welcome to the basics of Scratch!",
            link_source: "https://scratch.mit.edu/",
            link_video: null,
        },
        {
            id_materi: 1, // References "Scratch for Grade 1"
            index_pertemuan: 2,
            judul_pertemuan: "Creating Your First Scratch Project",
            isi_pertemuan: "Let's create your first Scratch project!",
            link_source: "https://scratch.mit.edu/",
            link_video: null,
        },
        {
            id_materi: 2, // References "Robotics for Beginners"
            index_pertemuan: 1,
            judul_pertemuan: "Introduction to Robotics",
            isi_pertemuan: "Welcome to the basics of Robotics!",
            link_source: null,
            link_video: "https://www.youtube.com/watch?v=1xqcd7j2K6A",
        },
        {
            id_materi: 2, // References "Robotics for Beginners"
            index_pertemuan: 2,
            judul_pertemuan: "Building Your First Robot",
            isi_pertemuan: "Let's build your first robot!",
            link_source: null,
            link_video: "https://www.youtube.com/watch?v=1xqcd7j2K6A",
        }
    ]

    await db.pertemuan.bulkCreate(pertemuans);
    console.log("Pertemuan have been seeded successfully.");
}

module.exports = seedPertemuan;