const db = require('../models');

const seedMateri = async () => {
    const materis = [
        {
            judul_materi: "Scratch for Grade 1",
            jenis_materi: "Coding",
            tools: null,
            jumlah_pertemuan: 12,
        },
        {
            judul_materi: "Roblox for Grade 2",
            jenis_materi: "Coding",
            tools: null,
            jumlah_pertemuan: 12,
        },
        {
            judul_materi: "Robotics for Beginners",
            jenis_materi: "Robotic",
            tools: "LEGO Mindstorms",
            jumlah_pertemuan: 10,
        },
        {
            judul_materi: "Arduino for Intermediate",
            jenis_materi: "Robotic",
            tools: "LEGO Mindstorms",
            jumlah_pertemuan: 10,
        },
    ]

    await db.materi.bulkCreate(materis);
    console.log("Materi have been seeded successfully.");
}

module.exports = seedMateri;