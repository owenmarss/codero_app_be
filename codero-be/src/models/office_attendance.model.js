const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const OfficeAttendance = sequelize.define("office_attendance", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users", // Adjust the model name if necessary
                key: "id",
            },
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: true,
            defaultValue: null,
        },
        status: {
            type: DataTypes.ENUM("Datang", "Pulang"),
            allowNull: false,
        },
        office_payroll_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "office_payrolls",
                key: "id",
            },
        },
    });

    return OfficeAttendance;
};
