const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        employee_id: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        gender: {
            type: Sequelize.ENUM('Laki-laki', 'Perempuan'),
            allowNull: true,
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        accessToken: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        position: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        working_hour: {
            type: Sequelize.ENUM('Full-Time', 'Part-Time', 'Internship'),
            allowNull: false,
        },
        branch: {
            type: Sequelize.STRING,
            allowNull: false,                        
        },
        npwp: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        bank: {
            type: Sequelize.ENUM('Mandiri', 'BCA'),
            allowNull: true,
        },
        account_number: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    });

    return User;
};

