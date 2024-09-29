const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Materi = sequelize.define("materi", {
        judul_materi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jenis_materi: {
            type: DataTypes.ENUM('Coding', 'Robotic'),
            allowNull: false,
        },
        tools: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        jumlah_pertemuan: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Materi;
}