const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const UserTeachingSchedule = sequelize.define('user_teaching_schedule', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE'
        },
        teaching_schedule_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'teaching_schedules',
                key: 'id',
            },
            onDelete: 'CASCADE'
        },
    })

    return UserTeachingSchedule;
}