const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Perbehentian = sequelize.define("perbehentian", {
        public_transport_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'public_transports',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        index_perbehentian: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        jenis_kendaraan: {
            type: DataTypes.ENUM('Bus', 'Kereta', 'Angkot', 'Ojek Online'),
            allowNull: true,
        },
        link_lokasi_mulai: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nama_lokasi_mulai: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        link_lokasi_tujuan: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nama_lokasi_tujuan: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        jarak: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        invoice: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return Perbehentian;
};