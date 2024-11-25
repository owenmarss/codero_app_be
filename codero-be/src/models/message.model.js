const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define('message', {
        id_sender: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        send_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        send_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    return Message;
};