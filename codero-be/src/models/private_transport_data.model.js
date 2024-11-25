const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PrivateTransportData = sequelize.define("private_transport_data", {
        private_transport_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'private_transports',
                key: 'id'
            },
            onDelete: 'CASCADE',
        },
        jenis_kendaraan: {
            type: DataTypes.ENUM('Mobil', 'Motor', 'Sepeda', 'Jalan Kaki'),
            allowNull: true,
        },
        // Datang
        link_lokasi_mulai_datang: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nama_lokasi_mulai_datang: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        link_lokasi_tujuan_datang: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nama_lokasi_tujuan_datang: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Pulang
        link_lokasi_mulai_pulang: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nama_lokasi_mulai_pulang: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        link_lokasi_tujuan_pulang: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nama_lokasi_tujuan_pulang: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Jarak
        jarak_datang: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        jarak_pulang: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        total_jarak: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        // Cost
        cost_datang: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cost_pulang: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        total_cost: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    return PrivateTransportData;
};