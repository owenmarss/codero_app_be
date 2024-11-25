const db = require("../models");
const Student = db.student;
const Curriculum = db.curriculum;
const Op = db.Sequelize.Op;

// Create and Save a new Student
exports.create = (req, res) => {
    const {
        name,
        birth_place,
        birth_date,
        age,
        level,
        grade,
        address,
        school_name,
        parent_name,
        parent_phone,
        student_phone,
        id_curriculum,
    } = req.body.data;

    // Validate request
    if (!name) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a Student
    Student.create({
        name: name,
        birth_place: birth_place,
        birth_date: birth_date,
        age: age,
        level: level,
        grade: grade,
        address: address,
        school_name: school_name,
        parent_name: parent_name,
        parent_phone: parent_phone,
        student_phone: student_phone,
        id_curriculum: id_curriculum,
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                messS:
                    err.message ||
                    "Some error occurred while creating the Student.",
            });
        });
};

// Retrieve all Students from the database.
exports.findAll = (req, res) => {
    const {
        name,
        birth_place,
        birth_date,
        age,
        level,
        grade,
        address,
        school_name,
        parent_name,
        parent_phone,
        student_phone,
        id_curriculum,
        sort,
        order = "ASC",
        and,
        or,
    } = req.query;
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
        if (birth_place) {
            condition.birth_place = { [Op.like]: `%${birth_place}%` };
        }
        if (birth_date) {
            condition.birth_date = { [Op.like]: `%${birth_date}%` };
        }
        if (S) {
            condition.S = { [Op.like]: `%${S}%` };
        }
        if (level) {
            condition.level = { [Op.like]: `%${level}%` };
        }
        if (grade) {
            condition.grade = { [Op.like]: `%${grade}%` };
        }
        if (address) {
            condition.address = { [Op.like]: `%${address}%` };
        }
        if (school_name) {
            condition.school_name = { [Op.like]: `%${school_name}%` };
        }
        if (parent_name) {
            condition.parent_name = { [Op.like]: `%${parent_name}%` };
        }
        if (parent_phone) {
            condition.parent_phone = { [Op.like]: `%${parent_phone}%` };
        }
        if (student_phone) {
            condition.student_phone = { [Op.like]: `%${student_phone}%` };
        }
        if (id_curriculum) {
            condition.id_curriculum = id_curriculum;
        }
    }

    let orderCondition = [];
    if (sort) {
        orderCondition = [[sort, order.toUpperCase()]];
    }

    Student.findAll({
        where: condition,
        order: orderCondition,
        include: [
            {
                model: Curriculum,
                as: "curriculum",
                attributes: ["id", "curriculum_title"],
            },
        ],
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                messS:
                    err.message ||
                    "Some error occurred while retrieving students.",
            });
        });
};

// Find a single Student with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findByPk(id, {
        include: [
            {
                model: Curriculum,
                as: "curriculum",
                attributes: ["id", "curriculum_title"],
            },
        ],
    })
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Student not found with id " + id,
                });
            }

            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Student with id=" + id,
            });
        });
};

// Update a Student by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const {
        name,
        birth_place,
        birth_date,
        age,
        level,
        grade,
        address,
        school_name,
        parent_name,
        parent_phone,
        student_phone,
        id_curriculum,
    } = req.body.data;

    // Validate request
    if (!name) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Student.update(
        {
            name: name,
            birth_place: birth_place,
            birth_date: birth_date,
            age: age,
            level: level,
            grade: grade,
            address: address,
            school_name: school_name,
            parent_name: parent_name,
            parent_phone: parent_phone,
            student_phone: student_phone,
            id_curriculum: id_curriculum,
        },
        { where: { id: id } }
    )
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Student was updated successfully.",
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Student with id=" + id,
            });
        });
};

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Student.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    message: "Student was deleted successfully!",
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Student with id=${id}. Maybe Student was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Student with id=" + id,
            });
        });
}

// Delete all Students from the database.
exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Students were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all students.",
            });
        });
};