const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PublicTransport = sequelize.define("public_transport", {
        transport_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'transports',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        total_stop: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        total_cost: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });

    return PublicTransport;
};