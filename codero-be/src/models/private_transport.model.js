const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PrivateTransport = sequelize.define("private_transport", {
        transport_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'transports',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        no_plat: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return PrivateTransport;
};