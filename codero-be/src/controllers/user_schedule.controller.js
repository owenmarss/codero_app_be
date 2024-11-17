const e = require("express");
const db = require("../models");
const UserSchedule = db.userSchedule;
const Schedule = db.schedule;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new UserSchedule
// exports.create = (req, res) => {
    // const { user_id, schedule_id } = req.body.data;

    // if (!user_id || !schedule_id) {
    //     return res.status(400).send({
    //         message: "Content can not be empty!",
    //     });
    // }

    // ? Many-to-Many relationship
    // try {
    //     User.findByPk(user_id)
    //         .then((user) => {
    //             if (!user) {
    //                 return res.status(404).send({
    //                     message: "User not found!",
    //                 });
    //             } else {
    //                 Schedule.findByPk(schedule_id)
    //                     .then((schedule) => {
    //                         if (!schedule) {
    //                             return res.status(404).send({
    //                                 message: "Schedule not found!",
    //                             });
    //                         } else {
    //                             user.addSchedule(schedule)
    //                                 .then(() => {
    //                                     res.status(201).send({
    //                                         message: "UserSchedule was created successfully!",
    //                                     });
    //                                 })
    //                                 .catch((err) => {
    //                                     res.status(500).send({
    //                                         message:
    //                                             err.message ||
    //                                             "Some error occurred while CREATING the UserSchedule.",
    //                                     });
    //                                 });
    //                         }
    //                     })
    //             }
    //         })
    // } catch (err) {
    //     res.status(500).send({
    //         message:
    //             err.message ||
    //             "Some error occurred while TRYING the UserSchedule.",
    //     });
    // }

    // ? One-to-Many relationship
    // User.findByPk(user_id)
    //     .then((user) => {
    //         if (!user) {
    //             return res.status(404).send({
    //                 message: "User not found!",
    //             });
    //         } else {
    //             Schedule.findByPk(schedule_id)
    //                 .then((schedule) => {
    //                     if (!schedule) {
    //                         return res.status(404).send({
    //                             message: "Schedule not found!",
    //                         });
    //                     } else {
    //                         // Create a UserSchedule
    //                         UserSchedule.create({
    //                             user_id: user_id,
    //                             schedule_id: schedule_id,
    //                         })
    //                             .then(() => {
    //                                 res.status(201).send({
    //                                     message: "UserSchedule was created successfully!",
    //                                 });
    //                             })
    //                             .catch((err) => {
    //                                 res.status(500).send({
    //                                     message:
    //                                         err.message ||
    //                                         "Some error occurred while creating the UserSchedule.",
    //                                 });
    //                             });
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     res.status(500).send({
    //                         message:
    //                             err.message ||
    //                             "Some error occurred while checking the Schedule.",
    //                     });
    //                 });
    //         }
    //     })
    //     .catch((err) => {
    //         res.status(500).send({
    //             message:
    //                 err.message ||
    //                 "Some error occurred while checking the User.",
    //         });
    //     });
// };

// * Assign a schedule to users
exports.assignScheduleToUsers = async (req, res) => {
    const { schedule_id, user_ids } = req.body.data;

    if (!schedule_id || !Array.isArray(user_ids)) {
        return res.status(400).send({
            message: "Schedule ID and an array of user IDs are required!",
        });
    }

    try {
        const schedule = await Schedule.findByPk(schedule_id);
        if (!schedule) {
            return res.status(404).send({
                message: "Schedule not found!",
            });
        }

        await schedule.addUsers(user_ids);

        res.status(200).send({
            message: "Users were assigned to the schedule successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error assigning users to the schedule!",
        });
    }
}

// * Retrieve all UserSchedules from the database.
    // ! NOT USED IN THE ROUTES
// exports.findAll = async (req, res) => {
//     UserSchedule.findAll({
//         include: [
//             {
//                 model: User,
//                 as: "user",
//                 attributes: ["id", "namaDepan", "namaBelakang", "posisi", "divisi", "cabang"],
//             },
//             {
//                 model: Schedule,
//                 as: "schedule",
//                 attributes: ["id", "jenis_client", "jenis_sesi", "jenis_kegiatan", "hari", "tanggal", "jam_mulai", "jam_selesai", "status"],
//             },
//         ],
//     })
//         .then((data) => {
//             if (data.length === 0 || !data) {
//                 return res.status(404).send({
//                     message: "The user(s) is / are not found!",
//                 });
//             }
//             console.log("user_schedule : ", data);
//             res.status(200).send(data);
//         })
//         .catch((err) => {
//             console.log("Error banget : ", err);
//             res.status(500).send({                
//                 message:
//                     err.message ||
//                     "Some error occurred while retrieving UserSchedules.",
//             });
//         });
// };


// * Find a single UserSchedule with an id
    // ! NOT USED IN THE ROUTES
// exports.findOne = (req, res) => {
//     const id = req.params.id;

//     UserSchedule.findByPk(id, {
//         include: [
//             {
//                 model: User,
//                 as: "user",
//                 attributes: ["id", "namaDepan", "namaBelakang", "posisi", "divisi", "cabang"],
//             },
//             {
//                 model: Schedule,
//                 as: "schedule",
//                 attributes: ["id", "jenis_client", "jenis_sesi", "jenis_kegiatan", "hari", "tanggal", "jam_mulai", "jam_selesai", "status"],
//             },
//         ],
//     })
//         .then((data) => {
//             if (data.length === 0 || !data) {
//                 return res.status(404).send({
//                     message: "The user(s) is / are not found!",
//                 });
//             }
//             res.status(200).send(data);
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message: "Error retrieving UserSchedule with id=" + id,
//             });
//         });
// };

// Find all UserSchedule with an user_id
exports.findByUser =  async (req, res) => {
    const user_id = req.params.id;

    // ? One-to-Many relationship
    // const user_id = parseInt(req.query.user_id);

    // ? Many-to-Many relationship
    if (!user_id) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    try {
        const user = await User.findByPk(user_id, {
            include: [
                {
                    model: Schedule,
                    as: "schedules",
                    attributes: ["id", "jenis_client", "jenis_sesi", "jenis_kegiatan", "hari", "tanggal", "jam_mulai", "jam_selesai", "status"],
                },
            ],
        })
            .then((user) => {
                if (user.length === 0 || !user) {
                    return res.status(404).send({
                        message: "The user(s) is / are not found!",
                    });
                }
                res.status(200).send(user.schedules);
        })
    } catch (err) {
        res.status(500).send({
            message: err.message ||
            "Error retrieving UserSchedule"
        });
    }


    // ? One-to-Many relationship
    // UserSchedule.findAll({
    //     where: {
    //         user_id: user_id
    //     },
    //     include: [
    //         {
    //             model: User,
    //             as: "user",
    //             attributes: ["id", "namaDepan", "namaBelakang", "posisi", "divisi", "cabang"],
    //         },
    //         {
    //             model: Schedule,
    //             as: "schedule",
    //             attributes: ["id", "jenis_client", "jenis_sesi", "jenis_kegiatan", "hari", "tanggal", "jam_mulai", "jam_selesai", "status"],
    //         },
    //     ],
    // })
    //     .then((data) => {
    //         if (data.length === 0 || !data) {
    //             return res.status(404).send({
    //                 message: "The user(s) is / are not found!",
    //             });
    //         }
    //         res.status(200).send(data);
    //     })
    //     .catch((err) => {
    //         res.status(500).send({
    //             message: err.message ||
    //             "Error retrieving UserSchedule",
    //         });
    //     });
};

// Find all UserSchedule with an schedule_id
exports.findBySchedule = async (req, res) => {
    // ? Many-to-Many relationship
    const schedule_id = req.params.id;

    // ? One-to-Many relationship
    // const schedule_id = parseInt(req.query.schedule_id);

    // ? Many-to-Many relationship
    if (!schedule_id) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    try {
        const schedule = await Schedule.findByPk(schedule_id, {
            include: [
                {
                    model: User,
                    as: "users",
                    attributes: ["id", "namaDepan", "namaBelakang", "posisi", "divisi", "cabang"],
                },
            ],
        })
            .then((schedule) => {
                if (schedule.length === 0 || !schedule) {
                    return res.status(404).send({
                        message: "The schedule(s) is / are not found!",
                    });
                }
                res.status(200).send(schedule.users);
        })
    } catch (err) {
        res.status(500).send({
            message: err.message ||
            "Error retrieving UserSchedule"
        });
    }


    // ? One-to-Many relationship
    // UserSchedule.findAll({
    //     where: {
    //         schedule_id: schedule_id
    //     },
    //     include: [
    //         {
    //             model: User,
    //             as: "user",
    //             attributes: ["id", "namaDepan", "namaBelakang", "posisi", "divisi", "cabang"],
    //         },
    //         {
    //             model: Schedule,
    //             as: "schedule",
    //             attributes: ["id", "jenis_client", "jenis_sesi", "jenis_kegiatan", "hari", "tanggal", "jam_mulai", "jam_selesai", "status"],
    //         },
    //     ],
    // })
    //     .then((data) => {
    //         if (data.length === 0 || !data) {
    //             return res.status(404).send({
    //                 message: "The schedule(s) is / are not found!",
    //             });
    //         }
    //         res.status(200).send(data);
    //     })
    //     .catch((err) => {
    //         res.status(500).send({
    //             message: err.message ||
    //             "Error retrieving UserSchedule",
    //         });
    //     });
};


// * Update the schedules associated with a user
exports.updateSchedulesForUser = async (req, res) => {
    const { user_id, schedule_ids } = req.body.data;

    if (!user_id || !Array.isArray(schedule_ids)) {
        return res.status(400).send({
            message: "User ID and an array of schedule IDs are required!",
        });
    }

    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).send({
                message: "User not found!",
            });
        }

        await user.setSchedules(schedule_ids);

        res.status(200).send({
            message: "Schedules for the user were updated successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating schedules for the user!",
        });
    }
}

// * Update the users associated with a schedule
exports.updateUsersForSchedule = async (req, res) => {
    const { schedule_id, user_ids } = req.body.data;

    if (!schedule_id || !Array.isArray(user_ids)) {
        return res.status(400).send({
            message: "Schedule ID and an array of user IDs are required!",
        });
    }

    try {
        const schedule = await Schedule.findByPk(schedule_id);
        if (!schedule) {
            return res.status(404).send({
                message: "Schedule not found!",
            });
        }

        await schedule.setUsers(user_ids);

        res.status(200).send({
            message: "Users for the schedule were updated successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating users for the schedule!",
        });
    }
}

// * Delete the schedules associated with a user
exports.deleteSchedulesForUser = async (req, res) => {
    const { user_id, schedule_ids } = req.body.data;

    if (!user_id || !Array.isArray(schedule_ids)) {
        return res.status(400).send({
            message: "User ID and an array of schedule IDs are required!",
        });
    }

    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).send({
                message: "User not found!",
            });
        }

        // Verify existing associations
        const schedulesToRemove = [];
        for (const id of schedule_ids) {
            const hasSchedule = await user.hasSchedule(id);
            if (hasSchedule) {
                schedulesToRemove.push(id);
            }
        }

        // Remove only existing associations
        if (schedulesToRemove.length === 0) {
            return res.status(404).send({
                message: "No schedules to remove from the user!",
            });
        } 

        await user.removeSchedules(schedulesToRemove);

        res.status(200).send({
            message: `Successfully removed ${schedulesToRemove.length} schedule(s) from the user.`,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting schedules for the user!"
        });
    }
};

// * Delete the users associated with a schedule
exports.deleteUsersForSchedule = async (req, res) => {
    const { schedule_id, user_ids } = req.body.data;

    if (!schedule_id || !Array.isArray(user_ids)) {
        return res.status(400).send({
            message: "Schedule ID and an array of user IDs are required!",
        });
    }

    try {
        const schedule = await Schedule.findByPk(schedule_id);
        if (!schedule) {
            return res.status(404).send({
                message: "Schedule not found!",
            });
        }

        // Verify existing associations
        const usersToRemove = [];
        for (const id of user_ids) {
            const hasUser = await schedule.hasUser(id);
            if (hasUser) {
                usersToRemove.push(id);
            }
        }

        if (usersToRemove.length === 0) {
            return res.status(404).send({
                message: "No users found to remove for this schedule.",
            });
        }

        await schedule.removeUsers(usersToRemove);

        res.status(200).send({
            message: "Users for the schedule were deleted successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting users for the schedule!",
        });
    }
}


// * Find a single UserSchedule with an user_id and schedule_id
    // ! NOT USED IN THE ROUTES
// exports.findOneByUserAndSchedule = (req, res) => {
//     const user_id = parseInt(req.query.user_id);
//     const schedule_id = parseInt(req.query.schedule_id);

//     UserSchedule.findOne({
//         where: {
//             user_id: user_id,
//             schedule_id: schedule_id
//         },
//         include: [
//             {
//                 model: User,
//                 as: "user",
//                 attributes: ["id", "namaDepan", "namaBelakang", "posisi", "divisi", "cabang"],
//             },
//             {
//                 model: Schedule,
//                 as: "schedule",
//                 attributes: ["id", "jenis_client", "jenis_sesi", "jenis_kegiatan", "hari", "tanggal", "jam_mulai", "jam_selesai", "status"],
//             },
//         ],
//     })
//         .then((data) => {
//             // if(data.length === 0) {
//             //     res.status(404).send({
//             //         message: "UserSchedule not found!",
//             //     });
//             // }
//             if (data.length === 0 || !data) {
//                 return res.status(404).send({
//                     message: "The users and the schedules are not found!",
//                 });
//             }
//             res.status(200).send(data);
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message: err.message ||
//                 "Error retrieving UserSchedule",
//             });
//         });
// };


// * Update a UserSchedule by the id in the request
    // ! NOT USED IN THE ROUTES
// exports.update = (req, res) => {
//     const id = req.params.id;
//     const { user_id, schedule_id } = req.body.data;

//     UserSchedule.update({
//         user_id: user_id,
//         schedule_id: schedule_id,
//     }, {
//         where: { id: id }
//     })
//         .then((result) => {
//             if (result == 1) {
//                 res.send({
//                     message: "UserSchedule was updated successfully.",
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update UserSchedule with id=${id}. Maybe UserSchedule was not found or req.body is empty!`,
//                 });
//             }
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message: "Error updating UserSchedule with id=" + id,
//             });
//         });
// };


// * Delete a UserSchedule with the specified id in the request
    // ! NOT USED IN THE ROUTES
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     UserSchedule.destroy({
//         where: { id: id }
//     })
//         .then((result) => {
//             if (result == 1) {
//                 res.send({
//                     message: "UserSchedule was deleted successfully!",
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete UserSchedule with id=${id}. Maybe UserSchedule was not found!`,
//                 });
//             }
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message: "Could not delete UserSchedule with id=" + id,
//             });
//         });
// };


// * Delete all UserSchedules from the database.
    // ! NOT USED IN THE ROUTES
// exports.deleteAll = (req, res) => {
//     UserSchedule.destroy({
//         where: {},
//         truncate: false
//     })
//         .then((nums) => {
//             res.send({ message: `${nums} UserSchedules were deleted successfully!` });
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while removing all UserSchedules.",
//             });
//         });
// };