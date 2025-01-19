const db = require('../models');

const seedTeachingSchedule = async () => {
    const teachingSchedules = [
        {
            client_type: "Sekolah / Centre",
            session_type: "Onsite",
            activity: "Mengajar",
            day: "Senin",
            date: "2024-11-20",
            start_time: "08:00:00",
            finish_time: "10:00:00",
            partner_id: 1, // Replace with valid school centre ID
            student_id: null, // Replace with valid student ID
            status: "Masuk",
        },
        {
            client_type: "Private",
            session_type: "Online",
            activity: "Trial Class",
            day: "Selasa",
            date: "2024-11-21",
            start_time: "13:00:00",
            finish_time: "14:00:00",
            partner_id: null,
            student_id: 1, // Replace with valid student ID
            status: "Masuk",
        },
        {
            client_type: "Sekolah / Centre",
            session_type: "Onsite",
            activity: "Mengajar",
            day: "Rabu",
            date: "2024-11-22",
            start_time: "07:00:00",
            finish_time: "09:00:00",
            partner_id: 2, // Replace with valid school centre ID
            student_id: null, // Replace with valid student ID
            status: "Libur",
        },
        {
            client_type: "Private",
            session_type: "Online",
            activity: "Visit",
            day: "Kamis",
            date: "2024-11-23",
            start_time: "14:00:00",
            finish_time: "15:00:00",
            partner_id: null,
            student_id: 2, // Replace with valid student ID
            status: "Masuk",
        },
    ]

    await db.teachingSchedule.bulkCreate(teachingSchedules);
    console.log("Schedule have been seeded successfully.");
};

module.exports = seedTeachingSchedule;