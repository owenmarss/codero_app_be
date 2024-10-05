const db = require("../models");
const bcrypt = require("bcryptjs");

const seedUsers = async () => {
    // await db.sequelize.sync({ force: true }); // This will drop the table if it already exists
    const users = [
        {
            userId: "OWEN-001",
            namaDepan: "Owen",
            namaBelakang: "Marscel",
            jenisKelamin: "Laki-laki",
            tanggalLahir: "2003-08-27",
            email: "owenmarscel@codero.com",
            noTelp: "081234567890",
            alamat: "Jl. Raya No. 123",
            kota: "Jakarta",
            posisi: "Head",
            divisi: "Full-Time",
            cabang: "Jakarta",
            password: bcrypt.hashSync("password123", 8),
            // password: "password123",
        },
        {
            userId: "AKHER-002",
            namaDepan: "Akher",
            namaBelakang: "El",
            jenisKelamin: "Laki-laki",
            tanggalLahir: "1998-08-18",
            email: "akherel@codero.com",
            noTelp: "08112345678",
            alamat: "Jl. Codero No. 123",
            kota: "Jakarta",
            posisi: "Teacher",
            divisi: "Part-Time",
            cabang: "Jakarta",
            password: bcrypt.hashSync("password123", 8),
            // password: "password123",
        },
        {
            userId: "SINGGIH-003",
            namaDepan: "Singgih",
            namaBelakang: "Agus",
            jenisKelamin: "Laki-laki",
            tanggalLahir: "1975-05-05",
            email: "singgihagus@codero.com",
            noTelp: "08123455432",
            alamat: "Jl. Codero No. 123",
            kota: "Tanggerang",
            posisi: "Head",
            divisi: "Full-Time",
            cabang: "Tanggerang",
            password: bcrypt.hashSync("password123", 8),
            // password: "password123",
        },
    ];

    await db.user.bulkCreate(users);
    console.log("Users have been seeded");
};

module.exports = seedUsers;
