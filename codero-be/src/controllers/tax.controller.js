const db = require("../models");
const Tax = db.tax;
const Op = db.Sequelize.Op;

// Create and Save a new Tax
exports.create = (req, res) => {
    const { dependents, annual_ptkp, value } = req.body.data;

    if (!dependents || !annual_ptkp || !value) {
        return res.status(400).send({
            message: "All fields are required!",
        });
    }

    const tax = {
        dependents,
        annual_ptkp,
        value,
    };

    Tax.create(tax)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Tax.",
            });
        });
};

// Retrieve all Taxes
exports.findAll = (req, res) => {
    const { dependents, sort, order = "ASC" } = req.query;
    let condition = dependents
        ? { dependents: { [Op.like]: `%${dependents}%` } }
        : null;

    let orderCondition = [];
    if (sort) {
        orderCondition.push([sort, order.toUpperCase()]);
    }

    Tax.findAll({
        where: condition,
        order: orderCondition,
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving taxes.",
            });
        });
};

// Find a single Tax by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tax.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tax with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tax with id=" + id,
            });
        });
};

// Update a Tax by ID
exports.update = (req, res) => {
    const id = req.params.id;
    const { dependents, annual_ptkp, value } = req.body.data;

    Tax.update(
        { dependents, annual_ptkp, value },
        {
            where: { id: id },
        }
    )
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tax was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Tax with id=${id}. Maybe Tax was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Tax with id=" + id,
            });
        });
};

// Delete a Tax by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Tax.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tax was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Tax with id=${id}. Maybe Tax was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Tax with id=" + id,
            });
        });
};

// Delete all Taxes
exports.deleteAll = (req, res) => {
    Tax.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Taxes were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all taxes.",
            });
        });
};
