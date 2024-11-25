const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
        id_curriculum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'curriculums',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        index_session: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        session_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        session_content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        link_source: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        link_video: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Session;
}