const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        namaDepan: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        namaBelakang: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        jenisKelamin: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        tanggalLahir: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        noTelp: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        alamat: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        kota: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        posisi: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        divisi: {
            type: Sequelize.STRING,
            allowNull: false,            
        },
        cabang: {
            type: Sequelize.STRING,
            allowNull: false,                        
        }
    });

    return User;
};

