const db = require("../models");
const bcrypt = require("bcryptjs");

const seedUsers = async () => {
    // await db.sequelize.sync({ force: true }); // This will drop the table if it already exists
    const users = [
        {
            employee_id: "OWEN-001",
            first_name: "Owen",
            last_name: "Marscel",
            gender: "Laki-laki",
            birth_date: "2003-08-27",
            email: "owenmarscel@codero.com",
            phone: "081234567890",
            address: "Jl. Raya No. 123",
            city: "Jakarta",
            position: "Head",
            working_hour: "Full-Time",
            branch: "Jakarta",
            password: bcrypt.hashSync("password123", 8),
            npwp: 1234567890,
            bank: "Mandiri",
            account_number: 270803,
            // password: "password123",
        },
        {
            employee_id: "AKHER-002",
            first_name: "Akher",
            last_name: "El",
            gender: "Laki-laki",
            birth_date: "1998-08-18",
            email: "akherel@codero.com",
            phone: "08112345678",
            address: "Jl. Codero No. 123",
            city: "Jakarta",
            position: "Teacher",
            working_hour: "Part-Time",
            branch: "Jakarta",
            npwp: 9876543210,
            bank: "Mandiri",
            account_number: 222222,
            password: bcrypt.hashSync("password123", 8),
            // password: "password123",
        },
        {
            employee_id: "SINGGIH-003",
            first_name: "Singgih",
            last_name: "Agus",
            gender: "Laki-laki",
            birth_date: "1975-05-05",
            email: "singgihagus@codero.com",
            phone: "08123455432",
            address: "Jl. Codero No. 123",
            city: "Tanggerang",
            position: "Head",
            working_hour: "Full-Time",
            branch: "Tanggerang",
            npwp: 6969696969,
            bank: "Mandiri",
            account_number: 696969,
            password: bcrypt.hashSync("password123", 8),
            // password: "password123",
        },
    ];

    await db.user.bulkCreate(users);
    console.log("Users have been seeded");
};

module.exports = seedUsers;
