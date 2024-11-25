const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Payroll = sequelize.define("payroll", {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total_attendance: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        total_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        end_date: {
            type: DataTypes.DATEONLY,
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
            allowNull: false,
        },
        year_period: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payment_status: {
            type: DataTypes.ENUM("Belum Dibayar", "Sudah Dibayar"),
            allowNull: false,
            defaultValue: "Belum Dibayar",
        },
        payment_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        payment_time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
    });

    return Payroll;
};
