const db = require("../models");

const seedTaxes = async () => {
    const tax = [
        {
            "dependents": "TK/0",
            "annual_ptkp": 54000000,
            "value": 0.05
        },
        {
            "dependents": "TK/1",
            "annual_ptkp": 58500000,
            "value": 0.05
        },
        {
            "dependents": "TK/2",
            "annual_ptkp": 63000000,
            "value": 0.05
        },
    ]

    await db.tax.bulkCreate(tax);
    console.log("Taxes have been seeded");
};

module.exports = seedTaxes;