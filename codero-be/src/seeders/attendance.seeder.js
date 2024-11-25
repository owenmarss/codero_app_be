const db = require('../models');

const seedAttendance = async () => {
    const attendances = [
        // {
        //     user_schedule_id: 1, // Replace with valid UserSchedule ID
        //     tanggal: "2024-11-20",
        //     jam_datang: "08:00:00",
        //     jam_pulang: "10:00:00",
        //     status: "Masuk",
        //     status_datang: "Sudah Isi",
        //     status_pulang: "Sudah Isi",
        // },
        // {
        //     user_schedule_id: 2, // Replace with valid UserSchedule ID
        //     tanggal: "2024-11-20",
        //     jam_datang: "08:15:00",
        //     jam_pulang: "10:05:00",
        //     status: "Masuk",
        //     status_datang: "Sudah Isi",
        //     status_pulang: "Belum Isi",
        // },
        // {
        //     user_schedule_id: 3, // Replace with valid UserSchedule ID
        //     tanggal: "2024-11-20",
        //     jam_datang: null, // Did not arrive
        //     jam_pulang: null, // Did not leave
        //     status: "Sakit",
        //     status_datang: null,
        //     status_pulang: null,
        // }
    ];

    await db.attendance.bulkCreate(attendances);
    console.log("Attendance have been seeded successfully.");
};

module.exports = seedAttendance;