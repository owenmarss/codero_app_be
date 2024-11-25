const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birth_place: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        level: {
            type: DataTypes.ENUM('TK', 'SD', 'SMP', 'SMA'),
            allowNull: true,
        },
        class: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        school_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        parent_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        parent_phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        student_phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        id_curriculum: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'curriculums',
                key: 'id',
            },
            onDelete: 'SET NULL',
        },
    })

    return Student;
};