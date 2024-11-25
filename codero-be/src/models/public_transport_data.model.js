const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PublicTransportData = sequelize.define("public_transport_data", {
        public_transport_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'public_transports',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        index_stop: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        vehicle_type: {
            type: DataTypes.ENUM('Bus', 'Kereta', 'Angkot', 'Ojek Online'),
            allowNull: true,
        },
        start_location_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        start_location_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        destination_location_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        destination_location_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        distance: {
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

    return PublicTransportData;
};