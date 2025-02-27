const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const TeachingPayroll = sequelize.define("teaching_payroll", {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total_attendance: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        total_amount_bruto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        monthly_ptkp: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        daily_ptkp: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        pkp: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        pph_value: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }, 
        total_amount_netto: {
            type: DataTypes.INTEGER,
            allowNull: true,
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

    return TeachingPayroll;
};
