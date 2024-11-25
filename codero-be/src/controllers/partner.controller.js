const db = require("../models");
const Partner = db.partner;
const Curriculum = db.curriculum;
const Op = db.Sequelize.Op;

// Create and Save a new School 
exports.create = (req, res) => {
    const { name, category, address, region, level, grade, id_curriculum } = req.body.data;

    if (!name || !category) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Partner.create({
        name: name,
        category: category,
        address: address,
        region: region,
        level: level,
        grade: grade,
        id_curriculum: id_curriculum
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the School or Centre.",
            });
        });
};

exports.findAll = (req, res) => {
    // const { name, category, address, region, level, grade, tipeMateri, materi, sort, order = "ASC", and, or } = req.query;
    const { name, category, address, region, level, grade, id_curriculum, sort, order = "ASC", and, or } = req.query;
    let condition = {};

    if (and) {
        const andConditions = JSON.parse(and).map((cond) => {
            const key = Object.keys(cond)[0];
            return { [key]: { [Op.like]: `%${cond[key]}%` } };
        });
        condition = { [Op.and]: andConditions };
    } else if (or) {
        const orConditions = JSON.parse(or).map((cond) => {
            const key = Object.keys(cond)[0];
            return { [key]: { [Op.like]: `%${cond[key]}%` } };
        });
        condition = { [Op.or]: orConditions };
    } else {
        if (name) {
            condition.name = { [Op.like]: `%${name}%` };
        }
        if (category) {
            condition.category = { [Op.like]: `%${category}%` };
        }
        if (address) {
            condition.address = { [Op.like]: `%${address}%` };
        }
        if (region) {
            condition.region = { [Op.like]: `%${region}%` };
        }
        if (level) {
            condition.level = { [Op.like]: `%${level}%` };
        }
        if (grade) {
            condition.grade = { [Op.like]: `%${grade}%` };
        }
        if (id_curriculum) {
            condition.id_curriculum = id_curriculum;
        }
    }

    let orderCondition = [];
    if (sort) {
        orderCondition = [[sort, order.toUpperCase()]];
    }

    Partner.findAll({
        where: condition,
        order: orderCondition,
        include: [
            {
                model: Curriculum,
                as: "curriculum",
                attributes: ["id", "curriculum_title", "curriculum_type"],
            },
        ],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving users.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Partner.findByPk(id, {
        include: [
            {
                model: Curriculum,
                as: "curriculum",
                attributes: ["id", "curriculum_title", "curriculum_type"],
            },
        ],
    })
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "School or Centre not found with id " + id,
                });
            }
            
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving School or Centre with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const { name, category, address, region, level, grade, id_curriculum } = req.body.data;

    if(!name || !category) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Partner.update(
        {
            name: name,
            category: category,
            address: address,
            region: region,
            level: level,
            grade: grade,
            id_curriculum: id_curriculum
        }, 
        {
            where: { id: id },
        }
    ).then((num) => {
        if (num == 1) {
            res.status(200).send({
                message: "School or Centre was updated successfully.",
            });
        } else {
            res.status(404).send({
                message: `Cannot update School or Centre with id=${id}. Maybe School or Centre was not found or req.body is empty!`,
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Error updating School or Centre with id=" + id,
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Partner.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    message: "School or Centre was deleted successfully!",
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete School or Centre with id=${id}. Maybe School or Centre was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete School or Centre with id=" + id,
            });
        });
};

exports.deleteAll = (req, res) => {
    Partner.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} School or Centre were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all School or Centre.",
            });
        });
};