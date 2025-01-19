const db = require("../models");
const seedUsers = require("./user.seeder");
const seedMessages = require("./message.seeder");
const seedMessageRecipients = require("./message_recipient.seeder");
const seedCurriculum = require("./curriculum.seeder");
const seedSession = require("./session.seeder");
const seedPartner = require("./partner.seeder");
const seedStudent = require("./student.seeder")

const seedTeachingSchedule = require("./teaching_schedule.seeder")
const seedUserTeachingSchedule = require("./user_teaching_schedule.seeder")
const seedTeachingAttendance = require("./teaching_attendance.seeder")
const seedTeachingPayroll = require("./teaching_payroll.seeder")

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
        await seedCurriculum();
        
        //* Seed pertemuan
        await seedSession();

        //* Seed partners
        await seedPartner();

        //* Seed students
        await seedStudent();

        //* Seed schedules
        await seedTeachingSchedule();

        //* Seed user schedules
        await seedUserTeachingSchedule();

        //* Seed presensi
        await seedTeachingAttendance();

        //* Seed payrolls
        await seedTeachingPayroll();

        console.log("All data seeded successfully.");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await db.sequelize.close();
    }
};

seedAll();