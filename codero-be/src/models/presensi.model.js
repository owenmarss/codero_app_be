// const { DataTypes } = require('sequelize');

// module.exports = (sequelize, Sequelize) => {
//     const Presensi = sequelize.define('presensi', {
//         tanggal: {
//             type: DataTypes.DATEONLY,
//             allowNull: true,
//         },
//         jam_datang: {
//             type: DataTypes.TIME,
//             allowNull: true,
//         },
//         jam_pulang: {
//             type: DataTypes.TIME,
//             allowNull: true,
//         },
//         status: {
//             type: DataTypes.ENUM('Masuk', 'Izin', 'Sakit', 'Alpa'),
//             allowNull: true,
//             defaultValue: 'Masuk'
//         },
//         status_datang: {
//             type: DataTypes.ENUM('Belum Isi', 'Sudah Isi'),
//             allowNull: true,
//             defaultValue: 'Belum Isi'
//         },
//         status_pulang: {
//             type: DataTypes.ENUM('Belum Isi', 'Sudah Isi'),
//             allowNull: true,
//             defaultValue: 'Belum Isi'
//         }
//     })

//     return Presensi;
// };