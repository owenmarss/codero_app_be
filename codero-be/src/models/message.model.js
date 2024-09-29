const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define('message', {
        id_pengirim: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        tanggal_dikirim: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        waktu_dikirim: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isi_pesan: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    return Message;
};