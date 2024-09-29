const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Pertemuan = sequelize.define("pertemuan", {
        id_materi: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'materis',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        index_pertemuan: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        judul_pertemuan: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isi_pertemuan: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        link_source: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        link_video: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Pertemuan;
}