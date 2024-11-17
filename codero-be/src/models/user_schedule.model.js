const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const UserSchedule = sequelize.define('user_schedule', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE'
        },
        schedule_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'schedules',
                key: 'id',
            },
            onDelete: 'CASCADE'
        },
    })

    return UserSchedule;
}