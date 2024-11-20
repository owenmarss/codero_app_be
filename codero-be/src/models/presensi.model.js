const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Presensi = sequelize.define('presensi', {
        user_schedule_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user_schedules',
                key: 'id',
            },
            onDelete: 'CASCADE'
        },
        tanggal: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        jam_datang: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        jam_pulang: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('Masuk', 'Izin', 'Sakit'),
            allowNull: true,
            // defaultValue: 'Masuk'
        },
        status_datang: {
            type: DataTypes.ENUM('Belum Isi', 'Sudah Isi'),
            allowNull: true,
            defaultValue: 'Belum Isi'
        },
        status_pulang: {
            type: DataTypes.ENUM('Belum Isi', 'Sudah Isi'),
            allowNull: true,
            defaultValue: 'Belum Isi'
        },
        payroll_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'payrolls',
                key: 'id',
            },
            onDelete: 'SET NULL'
        }
    })

    return Presensi;
};