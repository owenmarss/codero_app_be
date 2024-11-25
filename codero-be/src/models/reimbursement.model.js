const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Reimbursement = sequelize.define("reimbursement", {
        total_data: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        total_amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        month_period: {
            type: DataTypes.ENUM(
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember"
            ),
            allowNull: true,
        },
        year_period: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        payment_status: {
            type: DataTypes.ENUM("Belum Dibayar", "Sudah Dibayar"),
            allowNull: true,
            defaultValue: "Belum Dibayar",
        },
        payment_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        payment_time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
    });

    return Reimbursement;
};