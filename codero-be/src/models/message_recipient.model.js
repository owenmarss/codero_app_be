const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const MessageRecipient = sequelize.define('message_recipient', {
        id_message: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'messages',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        id_penerima: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        status: {
            type: DataTypes.ENUM('Dibaca', 'Belum Dibaca'),
            allowNull: false,
            defaultValue: 'Belum Dibaca',
        },
    });

    return MessageRecipient;
};