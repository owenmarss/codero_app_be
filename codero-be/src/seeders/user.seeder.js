const db = require("../models");

const seedUsers = async () => {
    try {
        await db.sequelize.sync({ force: true }); // This will drop the table if it already exists
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
                posisi: "Teacher",
                divisi: "Part-Time",
                cabang: "Jakarta",
                password: "password123",
            },
        ];

        await db.user.bulkCreate(users);
        console.log("Users have been seeded");
    } catch (error) {
        console.error("Error seeding users:", error);
    } finally {
        await db.sequelize.close();
    }
};

seedUsers();
