const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Reimbursement = sequelize.define("reimbursement", {
        jumlahs_data: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        total_nominal: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        tanggal_mulai: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        tanggal_selesai: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        periode_bulan: {
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
        periode_tahun: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status_pembayaran: {
            type: DataTypes.ENUM("Belum Dibayar", "Sudah Dibayar"),
            allowNull: true,
            defaultValue: "Belum Dibayar",
        },
        tanggal_pembayaran: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        jam_pembayaran: {
            type: DataTypes.TIME,
            allowNull: true,
        },
    });

    return Reimbursement;
};