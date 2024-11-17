const db = require('../models');

const seedSchedule = async () => {
    const schedules = [
        {
            jenis_client: "Sekolah / Centre",
            jenis_sesi: "Onsite",
            jenis_kegiatan: "Mengajar",
            hari: "Senin",
            tanggal: "2024-11-20",
            jam_mulai: "08:00:00",
            jam_selesai: "10:00:00",
            partner_id: 1, // Replace with valid school centre ID
            student_id: null, // Replace with valid student ID
            status: "Masuk",
        },
        {
            jenis_client: "Private",
            jenis_sesi: "Online",
            jenis_kegiatan: "Trial Class",
            hari: "Selasa",
            tanggal: "2024-11-21",
            jam_mulai: "13:00:00",
            jam_selesai: "14:00:00",
            partner_id: null,
            student_id: 1, // Replace with valid student ID
            status: "Masuk",
        },
        {
            jenis_client: "Sekolah / Centre",
            jenis_sesi: "Onsite",
            jenis_kegiatan: "Mengajar",
            hari: "Rabu",
            tanggal: "2024-11-22",
            jam_mulai: "07:00:00",
            jam_selesai: "09:00:00",
            partner_id: 2, // Replace with valid school centre ID
            student_id: null, // Replace with valid student ID
            status: "Libur",
        },
        {
            jenis_client: "Private",
            jenis_sesi: "Online",
            jenis_kegiatan: "Visit",
            hari: "Kamis",
            tanggal: "2024-11-23",
            jam_mulai: "14:00:00",
            jam_selesai: "15:00:00",
            partner_id: null,
            student_id: 2, // Replace with valid student ID
            status: "Masuk",
        },
    ]

    await db.schedule.bulkCreate(schedules);
    console.log("Schedule have been seeded successfully.");
};

module.exports = seedSchedule;