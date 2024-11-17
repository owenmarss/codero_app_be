const db = require("../models");
const UserSchedule = db.userSchedule;
const Schedule = db.schedule;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new UserSchedule
exports.create = (req, res) => {
    const { user_id, schedule_id } = req.body.data;

    if (!user_id || !schedule_id) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    User.findByPk(user_id)
        .then((user) => {
            if (!user) {
                res.status(404).send({
                    message: "User not found!",
                });
            } else {
                Schedule.findByPk(schedule_id)
                    .then((schedule) => {
                        if (!schedule) {
                            res.status(404).send({
                                message: "Schedule not found!",
                            });
                        } else {
                            // Create a UserSchedule
                            UserSchedule.create({
                                user_id: user_id,
                                schedule_id: schedule_id,
                            })
                                .then(() => {
                                    res.status(201).send({
                                        message: "UserSchedule was created successfully!",
                                    });
                                })
                                .catch((err) => {
                                    res.status(500).send({
                                        message:
                                            err.message ||
                                            "Some error occurred while creating the UserSchedule.",
                                    });
                                });
                        }
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message ||
                                "Some error occurred while checking the Schedule.",
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while checking the User.",
            });
        });
};

// Retrieve all UserSchedules from the database.
exports.findAll = async (req, res) => {
    UserSchedule.findAll({
        include: [
            {
                model: User,
                as: "user",
                attributes: ["id", "namaDepan", "namaBelakang", "posisi", "divisi", "cabang"],
            },
            {
                model: Schedule,
                as: "schedule",
                attributes: ["id", "jenis_client", "jenis_sesi", "jenis_kegiatan", "hari", "tanggal", "jam_mulai", "jam_selesai", "status"],
            },
        ],
    })
        .then((user_schedule) => {
            console.log("user_schedule : ", user_schedule);
            res.status(200).send(user_schedule);
        })
        .catch((err) => {
            console.log("Error banget : ", err);
            res.status(500).send({                
                message:
                    err.message ||
                    "Some error occurred while retrieving UserSchedules.",
            });
        });
};

// Find a single UserSchedule with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    UserSchedule.findByPk(id, {
        include: [
            {
                model: User,
                as: "user",
                attributes: ["id", "namaDepan", "namaBelakang", "posisi", "divisi", "cabang"],
            },
            {
                model: Schedule,
                as: "schedule",
                attributes: ["id", "jenis_client", "jenis_sesi", "jenis_kegiatan", "hari", "tanggal", "jam_mulai", "jam_selesai", "status"],
            },
        ],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving UserSchedule with id=" + id,
            });
        });
};

// Find all UserSchedule with an user_id
exports.findByUser = (req, res) => {   
    const user_id = parseInt(req.query.user_id) || 0;
    console.log("");
    console.log("");
    console.log("user_id : ", user_id);
    console.log("");
    console.log("");

    UserSchedule.findAll({
        where: {
            user_id: user_id
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ["id", "namaDepan", "namaBelakang", "posisi", "divisi", "cabang"],
            },
            {
                model: Schedule,
                as: "schedule",
                attributes: ["id", "jenis_client", "jenis_sesi", "jenis_kegiatan", "hari", "tanggal", "jam_mulai", "jam_selesai", "status"],
            },
        ],
    })
        .then((data) => {
            console.log(" ");
            console.log(" ");
            console.log(" ");
            console.log(user_id);
            console.log(" ");
            console.log(" ");
            console.log(" ");
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving UserSchedule",
            });
        });
};

// Find all UserSchedule with an schedule_id
exports.findBySchedule = (req, res) => {
    const schedule_id = req.query.schedule_id;
    console.log("");
    console.log("");
    console.log("schedule_id : ", schedule_id);
    console.log("");
    console.log("");

    UserSchedule.findAll({
        where: {
            schedule_id: schedule_id
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ["id", "namaDepan", "namaBelakang", "posisi", "divisi", "cabang"],
            },
            {
                model: Schedule,
                as: "schedule",
                attributes: ["id", "jenis_client", "jenis_sesi", "jenis_kegiatan", "hari", "tanggal", "jam_mulai", "jam_selesai", "status"],
            },
        ],
    })
        .then((data) => {
            console.log(" ");
            console.log(" ");
            console.log(" ");
            console.log(schedule_id);
            console.log(" ");
            console.log(" ");
            console.log(" ");
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving UserSchedule",
            });
        });
};

// Find a single UserSchedule with an user_id and schedule_id
exports.findOneByUserAndSchedule = (req, res) => {
    const user_id = req.query.user_id;
    const schedule_id = req.query.schedule_id;

    UserSchedule.findOne({
        where: {
            user_id: user_id,
            schedule_id: schedule_id
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ["id", "namaDepan", "namaBelakang", "posisi", "divisi", "cabang"],
            },
            {
                model: Schedule,
                as: "schedule",
                attributes: ["id", "jenis_client", "jenis_sesi", "jenis_kegiatan", "hari", "tanggal", "jam_mulai", "jam_selesai", "status"],
            },
        ],
    })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: "UserSchedule not found!",
                });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving UserSchedule",
            });
        });
};

// Update a UserSchedule by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const { user_id, schedule_id } = req.body.data;

    UserSchedule.update({
        user_id: user_id,
        schedule_id: schedule_id,
    }, {
        where: { id: id }
    })
        .then((result) => {
            if (result == 1) {
                res.send({
                    message: "UserSchedule was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update UserSchedule with id=${id}. Maybe UserSchedule was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating UserSchedule with id=" + id,
            });
        });
};

// Delete a UserSchedule with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    UserSchedule.destroy({
        where: { id: id }
    })
        .then((result) => {
            if (result == 1) {
                res.send({
                    message: "UserSchedule was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete UserSchedule with id=${id}. Maybe UserSchedule was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete UserSchedule with id=" + id,
            });
        });
};

// Delete all UserSchedules from the database.
exports.deleteAll = (req, res) => {
    UserSchedule.destroy({
        where: {},
        truncate: false
    })
        .then((nums) => {
            res.send({ message: `${nums} UserSchedules were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all UserSchedules.",
            });
        });
};