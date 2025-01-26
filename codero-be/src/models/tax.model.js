const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Tax = sequelize.define("tax", {
        dependents: {
            type: Sequelize.ENUM(
                "TK/0",
                "TK/1",
                "TK/2",
                "TK/3",
                "K/0",
                "K/1",
                "K/2",
                "K/3",
                "K/I/0",
                "K/I/1",
                "K/I/2",
                "K/I/3"
            ),
            allowNull: true,
        },
        annual_ptkp: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        value: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
    });

    return Tax;
};
