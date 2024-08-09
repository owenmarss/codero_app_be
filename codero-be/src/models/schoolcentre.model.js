const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const SchoolCentre = sequelize.define("schoolCentre", {
        nama: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        jenis: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        alamat: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        daerah: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        jenjang: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        kelas: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        tipeMateri: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        materi: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });

    return SchoolCentre;
};