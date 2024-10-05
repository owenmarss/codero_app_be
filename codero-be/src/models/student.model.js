const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('student', {
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tempat_lahir: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tanggal_lahir: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        umur: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        jenjang: {
            type: DataTypes.ENUM('TK', 'SD', 'SMP', 'SMA'),
            allowNull: true,
        },
        kelas: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        alamat: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nama_sekolah: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nama_ortu: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        no_telp_ortu: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        no_telp_anak: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        id_materi: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'materis',
                key: 'id',
            },
            onDelete: 'SET NULL',
        },
    })

    return Student;
};