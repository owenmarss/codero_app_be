const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const SchoolCentre = sequelize.define("schoolCentre", {
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jenis: {
            type: DataTypes.ENUM('Sekolah', 'Centre'),
            allowNull: false,
        },
        alamat: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        daerah: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        jenjang: {
            type: DataTypes.ENUM('TK', 'SD', 'SMP', 'SMA'),
            allowNull: true,
        },
        kelas: {
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
    });

    return SchoolCentre;
};