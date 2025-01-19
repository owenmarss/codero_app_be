const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const TeachingAttendance = sequelize.define('teaching_attendance', {
        user_teaching_schedule_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user_teaching_schedules',
                key: 'id',
            },
            onDelete: 'CASCADE'
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        arrival_time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        departure_time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('Masuk', 'Izin', 'Sakit'),
            allowNull: true,
            // defaultValue: 'Masuk'
        },
        arrival_status: {
            type: DataTypes.ENUM('Belum Isi', 'Sudah Isi'),
            allowNull: true,
            defaultValue: 'Belum Isi'
        },
        departure_status: {
            type: DataTypes.ENUM('Belum Isi', 'Sudah Isi'),
            allowNull: true,
            defaultValue: 'Belum Isi'
        },
        reimbursement_status: {
            type: DataTypes.ENUM('Belum Isi', 'Sudah Isi', 'Tidak Ada'),
            allowNull: true,
        },
        teaching_payroll_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'teaching_payrolls',
                key: 'id',
            },
            onDelete: 'SET NULL'
        }
    })

    return TeachingAttendance;
};