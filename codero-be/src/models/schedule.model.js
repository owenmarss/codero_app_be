const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Schedule = sequelize.define('schedule', {
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        jenis_client: {
            type: DataTypes.ENUM('Sekolah / Centre', 'Private'),
            allowNull: false
        },
        jenis_sesi: {
            type: DataTypes.ENUM('Onsite', 'Online'),
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
        status: {
            type: DataTypes.ENUM('Masuk', 'Libur'),
            allowNull: false
        },
    })

    return Schedule;
}