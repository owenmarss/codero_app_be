const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Partner = sequelize.define("partner", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM('Sekolah', 'Centre'),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        region: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        level: {
            type: DataTypes.ENUM('TK', 'SD', 'SMP', 'SMA'),
            allowNull: true,
        },
        grade: {
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
    });

    return Partner;
};