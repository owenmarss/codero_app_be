const db = require("../models");
const seedUsers = require("./user.seeder"); // Path to user seeder
const seedMessages = require("./message.seeder"); // Path to message seeder
const seedMessageRecipients = require("./message_recipient.seeder"); // Path to message_recipient seeder
const seedMateri = require("./materi.seeder"); // Path to materi seeder
const seedPertemuan = require("./pertemuan.seeder"); // Path to pertemuan seeder
const seedSchoolCentre = require("./schoolcentre.seeder"); // Path to schoolcentre seeder
const seedStudent = require("./student.seeder") // Path to student seeder

const seedAll = async () => {
    try {
        //TODO: Drop and recreate tables (fresh seeding)
        await db.sequelize.sync({ force: true });
        console.log("Database tables dropped and recreated.");

        //* Seed users first
        await seedUsers();

        //* Seed messages after users
        await seedMessages();

        //* Seed message recipients after messages
        await seedMessageRecipients();


        //* Seed materi
        await seedMateri();
        
        //* Seed pertemuan
        await seedPertemuan();
        
        //* Seed school centres
        await seedSchoolCentre();

        //* Seed students
        await seedStudent();

        console.log("All data seeded successfully.");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await db.sequelize.close();
    }
};

seedAll();