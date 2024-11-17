const db = require("../models");
const Schedule = db.schedule;
const Partner = db.partner;
const Student = db.student;
const Materi = db.materi;
const Op = db.Sequelize.Op;

// Create and Save a new Schedule
exports.create = (req, res) => {
    const {
        jenis_client,
        jenis_sesi,
        jenis_kegiatan,
        hari,
        tanggal,
        jam_mulai,
        jam_selesai,
        partner_id,
        student_id,
        status,
    } = req.body.data;

    if (!jenis_client || !jenis_sesi || !jenis_kegiatan || !hari || !tanggal || !jam_mulai || !jam_selesai || !status) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Schedule.create({
        jenis_client: jenis_client,
        jenis_sesi: jenis_sesi,
        jenis_kegiatan: jenis_kegiatan,
        hari: hari,
        tanggal: tanggal,
        jam_mulai: jam_mulai,
        jam_selesai: jam_selesai,
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
                    "Some error occurred while creating the Schedule.",
            });
        });
};

// Retrieve all Schedules from the database.
exports.findAll = (req, res) => {
    const { jenis_client, jenis_sesi, jenis_kegiatan, hari, tanggal, jam_mulai, jam_selesai, partner_id, student_id, status, sort, order = "ASC", and, or } = req.query;
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
        if (jenis_client) {
            condition.jenis_client = { [Op.like]: `%${jenis_client}%` };
        }
        if (jenis_sesi) {
            condition.jenis_sesi = { [Op.like]: `%${jenis_sesi}%` };
        }
        if (jenis_kegiatan) {
            condition.jenis_kegiatan = { [Op.like]: `%${jenis_kegiatan}%` };
        }
        if (hari) {
            condition.hari = { [Op.like]: `%${hari}%` };
        }
        if (tanggal) {
            condition.tanggal = { [Op.like]: `%${tanggal}%` };
        }
        if (jam_mulai) {
            condition.jam_mulai = { [Op.like]: `%${jam_mulai}%` };
        }
        if (jam_selesai) {
            condition.jam_selesai = { [Op.like]: `%${jam_selesai}%` };
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

    Schedule.findAll({
        where: condition,
        order: orderCondition,
        include: [
            {
                model: Partner,
                as: "partner",
                attributes: ["id", "nama", "id_materi"],
                include: [
                    {
                        model: Materi,
                        as: "materi",
                        attributes: ["id", "judul_materi", "jenis_materi"],
                    },
                ]
            },
            {
                model: Student,
                as: "student",
                attributes: ["id", "nama", "id_materi"],
                include: [
                    {
                        model: Materi,
                        as: "materi",
                        attributes: ["id", "judul_materi", "jenis_materi"],
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
                    "Some error occurred while retrieving Schedules.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Schedule.findByPk(id, {
        include: [
            {
                model: Partner,
                as: "partner",
                attributes: ["id", "nama"],
                include: [
                    {
                        model: Materi,
                        as: "materi",
                        attributes: ["id", "judul_materi", "jenis_materi"],
                    },
                ]
            },
            {
                model: Student,
                as: "student",
                attributes: ["id", "nama"],
                include: [
                    {
                        model: Materi,
                        as: "materi",
                        attributes: ["id", "judul_materi", "jenis_materi"],
                    },
                ]
            },
        ],
    })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: "Schedule not found!",
                });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Schedule with id=" + id,
            });
        });
};

// Update a Schedule by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const { jenis_client, jenis_sesi, jenis_kegiatan, hari, tanggal, jam_mulai, jam_selesai, partner_id, student_id, status } = req.body.data;

    if(!jenis_client || !jenis_sesi || !jenis_kegiatan || !hari || !tanggal || !jam_mulai || !jam_selesai || !status) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Schedule.update({
        jenis_client: jenis_client,
        jenis_sesi: jenis_sesi,
        jenis_kegiatan: jenis_kegiatan,
        hari: hari,
        tanggal: tanggal,
        jam_mulai: jam_mulai,
        jam_selesai: jam_selesai,
        partner_id: partner_id,
        student_id: student_id,
        status: status
    }, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    message: "Schedule was updated successfully.",
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Schedule with id=${id}. Maybe Schedule was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Schedule with id=" + id,
            });
        });
};

// Delete a Schedule with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Schedule.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    message: "Schedule was deleted successfully!",
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Schedule with id=${id}. Maybe Schedule was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Schedule with id=" + id,
            });
        });
};

// Delete all Schedules from the database.
exports.deleteAll = (req, res) => {
    Schedule.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Schedules were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all Schedules.",
            });
        });
};