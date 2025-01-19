const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const TeachingSchedule = sequelize.define('teaching_schedule', {
        client_type: {
            type: DataTypes.ENUM('Sekolah / Centre', 'Private'),
            allowNull: false
        },
        session_type: {
            type: DataTypes.ENUM('Onsite', 'Online'),
            allowNull: false
        },
        activity: {
            type: DataTypes.ENUM('Mengajar', 'Trial Class', 'Visit', 'Training', 'Office'),
            allowNull: false
        },
        day: {
            type: DataTypes.ENUM('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'),
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        finish_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        partner_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'partners',
                key: 'id'
            },
            onDelete: 'SET NULL',
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'students',
                key: 'id'
            },
            onDelete: 'SET NULL',
        },
        status: {
            type: DataTypes.ENUM('Masuk', 'Libur'),
            allowNull: false,
            defaultValue: 'Masuk'
        },
    })

    return TeachingSchedule;
}