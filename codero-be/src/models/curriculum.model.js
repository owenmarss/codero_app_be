const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Curriculum = sequelize.define("curriculum", {
        curriculum_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        curriculum_type: {
            type: DataTypes.ENUM('Coding', 'Robotic'),
            allowNull: false,
        },
        technology: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tools: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        total_session: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Curriculum;
}