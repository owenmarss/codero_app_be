const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Partner = sequelize.define("partner", {
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jenis_partner: {
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

    return Partner;
};