const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Schedule = sequelize.define('schedule', {
        jenis_client: {
            type: DataTypes.ENUM('Sekolah / Centre', 'Private'),
            allowNull: false
        },
        jenis_sesi: {
            type: DataTypes.ENUM('Onsite', 'Online'),
            allowNull: false
        },
        jenis_kegiatan: {
            type: DataTypes.ENUM('Mengajar', 'Trial Class', 'Visit', 'Training', 'Office'),
            allowNull: false
        },
        hari: {
            type: DataTypes.ENUM('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'),
            allowNull: false
        },
        tanggal: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        jam_mulai: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        jam_selesai: {
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

    return Schedule;
}