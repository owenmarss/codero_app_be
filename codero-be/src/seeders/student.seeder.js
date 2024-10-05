const db = require('../models');

const seedStudent = async () => {
    const students = [
        {
            nama: "John Doe",
            tempat_lahir: "Jakarta",
            tanggal_lahir: "2010-01-01",
            umur: 11,
            jenjang: "SD",
            kelas: 2,
            alamat: "Jl. Mangga Dua No. 3",
            nama_sekolah: "SMPN 1 Jakarta",
            nama_ortu: "Mr. Doe",
            no_telp_ortu: "081234567890",
            no_telp_anak: "081987654321",
            id_materi: 1,  // References "Scratch for Grade 1"
        },
        {
            nama: "Jane Smith",
            tempat_lahir: "Bandung",
            tanggal_lahir: "2011-04-15",
            umur: 13,
            jenjang: "SMP",
            kelas: "7",
            alamat: "Jl. Dago No. 5",
            nama_sekolah: "SMPN 2 Bandung",
            nama_ortu: "Mrs. Smith",
            no_telp_ortu: "081234567891",
            no_telp_anak: "081987654322",
            id_materi: 2,  // References "Robotics for Beginners"
        },
    ];

    await db.student.bulkCreate(students);
    console.log("Students have been seeded successfully.");
}

module.exports = seedStudent;