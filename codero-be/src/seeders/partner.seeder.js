const db = require('../models');

const seedPartner = async () => {
    const partners = [
        {
            nama: "SDK Penabur 1",
            jenis: "Sekolah",
            alamat: "Jl. Pasar Baru No.1",
            daerah: "Jakarta",
            jenjang: "SD",
            kelas: "2",
            id_materi: 1, // References "Scratch for Grade 1"
        },
        {
            nama: "SDK Penabur 3",
            jenis: "Sekolah",
            alamat: "Jl. Gunung Sahari No.3",
            daerah: "Jakarta",
            jenjang: "SD",
            kelas: "2",
            id_materi: 2, // References "Robotics for Beginners"
        },
        {
            nama: "Codero Bintaro",
            jenis: "Centre",
            alamat: "Jl. Bintaro",
            daerah: "Jakarta",
        },
    ]

    await db.partner.bulkCreate(partners);
    console.log("School centres have been seeded successfully.");
}

module.exports = seedPartner;