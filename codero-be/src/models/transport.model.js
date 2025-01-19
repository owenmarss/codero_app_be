const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Transport = sequelize.define("transport", {
        attendance_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'teaching_attendances',
                key: 'id'
            },
            onDelete: 'CASCADE',
        },
        type: {
            type: DataTypes.ENUM('Public', 'Private'),
            allowNull: true,
        },
        reimbursement_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'reimbursements',
                key: 'id'
            },
            onDelete: 'SET NULL',
        },
    });

    return Transport;
};