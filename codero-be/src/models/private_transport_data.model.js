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
        vehicle_type: {
            type: DataTypes.ENUM('Mobil', 'Motor', 'Sepeda', 'Jalan Kaki'),
            allowNull: true,
        },

        //* Datang
        arrival_start_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        arrival_start_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        arrival_destination_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        arrival_destination_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        //* Pulang
        departure_start_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        departure_start_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        departure_destination_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        departure_destination_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        //* Jarak
        arrival_distance: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        departure_distance: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        total_distance: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        //* Cost
        cost_arrival: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cost_departure: {
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