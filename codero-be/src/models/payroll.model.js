const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Payroll = sequelize.define("payroll", {
        nominal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        jumlah_presensi: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        total_nominal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tanggal_mulai: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        tanggal_selesai: {
            type: DataTypes.DATEONLY,
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
            allowNull: false,
        },
        periode_tahun: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status_pembayaran: {
            type: DataTypes.ENUM("Belum Dibayar", "Sudah Dibayar"),
            allowNull: false,
            defaultValue: "Belum Dibayar",
        },
        tanggal_pembayaran: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        jam_pembayaran: {
            type: DataTypes.TIME,
            allowNull: true,
        },
    });

    return Payroll;
};
