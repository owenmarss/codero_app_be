const db = require('../models');

const seedPartner = async () => {
    const partners = [
        {
            name: "SDK Penabur 1",
            category: "Sekolah",
            address: "Jl. Pasar Baru No.1",
            region: "Jakarta",
            level: "SD",
            grade: "2",
            id_curriculum: 1, // References "Scratch for Grade 1"
        },
        {
            name: "SDK Penabur 3",
            category: "Sekolah",
            address: "Jl. Gunung Sahari No.3",
            region: "Jakarta",
            level: "SD",
            grade: "2",
            id_curriculum: 2, // References "Robotics for Beginners"
        },
        {
            name: "Codero Bintaro",
            category: "Centre",
            address: "Jl. Bintaro",
            region: "Jakarta",
        },
    ]

    await db.partner.bulkCreate(partners);
    console.log("School centres have been seeded successfully.");
}

module.exports = seedPartner;