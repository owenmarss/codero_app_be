const db = require("../models");
const TeachingSchedule = db.teachingSchedule;
const Partner = db.partner;
const Student = db.student;
const Curriculum = db.curriculum;
const Op = db.Sequelize.Op;

// Create and Save a new TeachingSchedule
exports.create = (req, res) => {
    const {
        client_type,
        session_type,
        activity,
        day,
        date,
        start_time,
        finish_time,
        partner_id,
        student_id,
        status,
    } = req.body.data;

    if (!client_type || !session_type || !activity || !day || !date || !start_time || !finish_time || !status) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    TeachingSchedule.create({
        client_type: client_type,
        session_type: session_type,
        activity: activity,
        day: day,
        date: date,
        start_time: start_time,
        finish_time: finish_time,
        partner_id: partner_id,
        student_id: student_id,
        status: status
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the TeachingSchedule.",
            });
        });
};

// Retrieve all TeachingSchedules from the database.
exports.findAll = (req, res) => {
    const { client_type, session_type, activity, day, date, start_time, finish_time, partner_id, student_id, status, sort, order = "ASC", and, or } = req.query;
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
        if (client_type) {
            condition.client_type = { [Op.like]: `%${client_type}%` };
        }
        if (session_type) {
            condition.session_type = { [Op.like]: `%${session_type}%` };
        }
        if (activity) {
            condition.activity = { [Op.like]: `%${activity}%` };
        }
        if (day) {
            condition.day = { [Op.like]: `%${day}%` };
        }
        if (date) {
            condition.date = { [Op.like]: `%${date}%` };
        }
        if (start_time) {
            condition.start_time = { [Op.like]: `%${start_time}%` };
        }
        if (finish_time) {
            condition.finish_time = { [Op.like]: `%${finish_time}%` };
        }
        if (partner_id) {
            condition.partner_id = partner_id;
        }
        if (student_id) {
            condition.student_id = student_id;
        }
        if (status) {
            condition.status = { [Op.like]: `%${status}%` };
        }
    }

    let orderCondition = [];
    if (sort) {
        orderCondition = [[sort, order.toUpperCase()]];
    }

    TeachingSchedule.findAll({
        where: condition,
        order: orderCondition,
        include: [
            {
                model: Partner,
                as: "partner",
                attributes: ["id", "name", "id_curriculum"],
                include: [
                    {
                        model: Curriculum,
                        as: "curriculum",
                        attributes: ["id", "curriculum_title", "curriculum_type"],
                    },
                ]
            },
            {
                model: Student,
                as: "student",
                attributes: ["id", "name", "id_curriculum"],
                include: [
                    {
                        model: Curriculum,
                        as: "curriculum",
                        attributes: ["id", "curriculum_title", "curriculum_type"],
                    },
                ]
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
                    "Some error occurred while retrieving TeachingSchedules.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    TeachingSchedule.findByPk(id, {
        include: [
            {
                model: Partner,
                as: "partner",
                attributes: ["id", "name"],
                include: [
                    {
                        model: Curriculum,
                        as: "curriculum",
                        attributes: ["id", "curriculum_title", "curriculum_type"],
                    },
                ]
            },
            {
                model: Student,
                as: "student",
                attributes: ["id", "name"],
                include: [
                    {
                        model: Curriculum,
                        as: "curriculum",
                        attributes: ["id", "curriculum_title", "curriculum_type"],
                    },
                ]
            },
        ],
    })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: "TeachingSchedule not found!",
                });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving TeachingSchedule with id=" + id,
            });
        });
};

// Update a TeachingSchedule by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const { client_type, session_type, activity, day, date, start_time, finish_time, partner_id, student_id, status } = req.body.data;

    if(!client_type || !session_type || !activity || !day || !date || !start_time || !finish_time || !status) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    TeachingSchedule.update({
        client_type: client_type,
        session_type: session_type,
        activity: activity,
        day: day,
        date: date,
        start_time: start_time,
        finish_time: finish_time,
        partner_id: partner_id,
        student_id: student_id,
        status: status
    }, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    message: "TeachingSchedule was updated successfully.",
                });
            } else {
                res.status(404).send({
                    message: `Cannot update TeachingSchedule with id=${id}. Maybe TeachingSchedule was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating TeachingSchedule with id=" + id,
            });
        });
};

// Delete a TeachingSchedule with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    TeachingSchedule.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    message: "TeachingSchedule was deleted successfully!",
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete TeachingSchedule with id=${id}. Maybe TeachingSchedule was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete TeachingSchedule with id=" + id,
            });
        });
};

// Delete all TeachingSchedules from the database.
exports.deleteAll = (req, res) => {
    TeachingSchedule.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} TeachingSchedules were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all TeachingSchedules.",
            });
        });
};