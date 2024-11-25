const db = require('../models');

const seedPayroll = async () => {
    const payrolls = [
        // {
        //     nominal: 50000,
        //     jumlah_presensi: 20,
        //     total_nominal: 1000000,
        //     tanggal_mulai: "2024-11-01",
        //     tanggal_selesai: "2024-11-30",
        //     periode_bulan: "November",
        //     periode_tahun: 2024,
        //     status_pembayaran: "Sudah Dibayar",
        //     tanggal_pembayaran: "2024-12-01",
        //     jam_pembayaran: "10:00:00",
        // },
        // {
        //     nominal: 60000,
        //     jumlah_presensi: 22,
        //     total_nominal: 1320000,
        //     tanggal_mulai: "2024-10-01",
        //     tanggal_selesai: "2024-10-31",
        //     periode_bulan: "Oktober",
        //     periode_tahun: 2024,
        //     status_pembayaran: "Belum Dibayar",
        //     tanggal_pembayaran: null,
        //     jam_pembayaran: null,
        // },
    ]

    const createdPayrolls = await db.payroll.bulkCreate(payrolls);

    const attendanceData = await db.attendance.findAll({
        limit: 10,
    });

    for (let i = 0; i < attendanceData.length; i++) {
        const attendance = attendanceData[i];
        attendance.payroll_id = createdPayrolls[0].id;
        await attendance.save();
    }

    console.log("Payrolls have been seeded successfully.");
};

module.exports = seedPayroll;