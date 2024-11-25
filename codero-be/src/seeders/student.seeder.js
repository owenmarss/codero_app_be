const db = require('../models');

const seedStudent = async () => {
    const students = [
        {
            name: "John Doe",
            birth_place: "Jakarta",
            birth_date: "2010-01-01",
            age: 11,
            level: "SD",
            class: 2,
            address: "Jl. Mangga Dua No. 3",
            school_name: "SMPN 1 Jakarta",
            parent_name: "Mr. Doe",
            parent_phone: "081234567890",
            student_phone: "081987654321",
            id_curriculum: 1,  // References "Scratch for Grade 1"
        },
        {
            name: "Jane Smith",
            birth_place: "Bandung",
            birth_date: "2011-04-15",
            age: 13,
            level: "SMP",
            class: "7",
            address: "Jl. Dago No. 5",
            school_name: "SMPN 2 Bandung",
            parent_name: "Mrs. Smith",
            parent_phone: "081234567891",
            student_phone: "081987654322",
            id_curriculum: 2,  // References "Robotics for Beginners"
        },
    ];

    await db.student.bulkCreate(students);
    console.log("Students have been seeded successfully.");
}

module.exports = seedStudent;