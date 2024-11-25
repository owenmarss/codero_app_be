const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Transport = sequelize.define("transport", {
        presensi_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'presensis',
                key: 'id'
            },
            onDelete: 'CASCADE',
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
        transport_type: {
            type: DataTypes.ENUM('Public', 'Private'),
            allowNull: true,
        }
    });

    return Transport;
};