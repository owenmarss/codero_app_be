const db = require("../models");
// const UserSchedule = db.userTeachingSchedule;
// const Schedule = db.schedule;
// const Attendance = db.attendance;
const User = db.user;
const Partner = db.partner;
const Student = db.student;
const Curriculum = db.curriculum;
const Op = db.Sequelize.Op;

const UserTeachingSchedule = db.userTeachingSchedule;
const TeachingSchedule = db.teachingSchedule;
const TeachingAttendance = db.teachingAttendance;


// * Assign a schedule to users
exports.assignScheduleToUsers = async (req, res) => {
    const { teaching_schedule_id, user_ids, date } = req.body.data;

    if (!teaching_schedule_id || !Array.isArray(user_ids)) {
        return res.status(400).send({
            message: "Schedule ID and an array of user IDs are required!",
        });
    }

    try {
        const teachingSchedule = await TeachingSchedule.findByPk(teaching_schedule_id);
        if (!teachingSchedule) {
            return res.status(404).send({
                message: "Schedule not found!",
            });
        }

        await teachingSchedule.addUsers(user_ids);

        const userTeachingSchedules = await UserTeachingSchedule.findAll({
            where: {
                user_id: user_ids,
                teaching_schedule_id: teaching_schedule_id,
            }
        });

        const attendanceData = userTeachingSchedules.map((userTeachingSchedule) => {
            const reimbursementStatus = teachingSchedule.session_type === 'Onsite' ? 'Belum Isi' : 'Tidak Ada';

            console.log(`Assigning reimbursement_status: ${reimbursementStatus}`); // Debug log

            return {
                user_teaching_schedule_id: userTeachingSchedule.id,
                date: date || null,
                arrival_time: "Belum Isi",
                departure_time: "Belum Isi",
                teaching_payroll_id: null,
                reimbursement_status: reimbursementStatus,
            }
        });

        await TeachingAttendance.bulkCreate(attendanceData);

        res.status(200).send({
            message: "Users were assigned to the schedule successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error assigning users to the schedule!",
        });
    }
}

// ? Get all schedules
exports.getAllSchedules = async (req, res) => {
    try {
        const teachingSchedule = await TeachingSchedule.findAll({
            include: [
                {
                    model: Partner,
                    as: "partner",
                    attributes: ["id", "name", "address", "id_curriculum"],
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
                    attributes: ["id", "name", "address", "id_curriculum"],
                    include: [
                        {
                            model: Curriculum,
                            as: "curriculum",
                            attributes: ["id", "curriculum_title", "curriculum_type"],
                        },
                    ]
                },
                {
                    model: User,
                    as: "users",
                    attributes: ["id", "first_name", "last_name", "position", "working_hour", "branch"],
                    through: {
                        attributes: [],
                    }
                }
            ]
        });

        if (teachingSchedule.length === 0) {
            return res.status(404).send({
                message: "No schedules found!",
            });
        }

        res.status(200).send(teachingSchedule);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving UserSchedule"
        });
    }
}

// ? Get all assigned schedules
exports.getAllAssignedSchedules = async (req, res) => {
    try {
        const teachingSchedule = await TeachingSchedule.findAll({
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
                {
                    model: User,
                    as: "users",
                    attributes: ["id", "first_name", "last_name", "position", "working_hour", "branch"],
                    through: {
                        attributes: [],
                    }
                }
            ]
        });

        const filteredSchedules = teachingSchedule.filter(schedule => schedule.users && schedule.users.length > 0);

        if (filteredSchedules.length === 0) {
            return res.status(404).send({
                message: "No schedules found with assigned users!",
            });
        }

        res.status(200).send(filteredSchedules);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving UserSchedule"
        });
    }
}

// ? Find all UserSchedule with an user_id
exports.findByUser =  async (req, res) => {
    const user_id = req.params.id;

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
                    model: TeachingSchedule,
                    as: "teachingSchedules",
                    attributes: ["id", "client_type", "session_type", "activity", "day", "date", "start_time", "finish_time", "status"],
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
                    ]
                },
            ],
        })
            .then((user) => {
                if (user.length === 0 || !user) {
                    return res.status(404).send({
                        message: "The user(s) is / are not found!",
                    });
                }
                res.status(200).send(user.teachingSchedules);
        })
    } catch (err) {
        res.status(500).send({
            message: err.message ||
            "Error retrieving UserSchedule"
        });
    }
};

// ? Find all UserSchedule with an schedule_id
exports.findBySchedule = async (req, res) => {
    // ? Many-to-Many relationship
    const teaching_schedule_id = req.params.id;

    // ? Many-to-Many relationship
    if (!teaching_schedule_id) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    try {
        const teachingSchedule = await TeachingSchedule.findByPk(teaching_schedule_id, {
            include: [
                {
                    model: User,
                    as: "users",
                    attributes: ["id", "first_name", "last_name", "position", "working_hour", "branch"],
                },
            ],
        })
            .then((teachingSchedule) => {
                if (teachingSchedule.length === 0 || !teachingSchedule) {
                    return res.status(404).send({
                        message: "The schedule(s) is / are not found!",
                    });
                }
                res.status(200).send(teachingSchedule.users);
        })
    } catch (err) {
        res.status(500).send({
            message: err.message ||
            "Error retrieving UserSchedule"
        });
    }
};

// ? Update the schedules associated with a user
exports.updateSchedulesForUser = async (req, res) => {
    const { user_id, teaching_schedule_ids } = req.body.data;

    if (!user_id || !Array.isArray(teaching_schedule_ids)) {
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

        await user.setTeachingSchedules(teaching_schedule_ids);

        res.status(200).send({
            message: "Schedules for the user were updated successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating schedules for the user!",
        });
    }
}

// ? Update the users associated with a schedule
exports.updateUsersForSchedule = async (req, res) => {
    const { teaching_schedule_id, user_ids } = req.body.data;

    if (!teaching_schedule_id || !Array.isArray(user_ids)) {
        return res.status(400).send({
            message: "Schedule ID and an array of user IDs are required!",
        });
    }

    try {
        const teachingSchedule = await TeachingSchedule.findByPk(teaching_schedule_id);
        if (!teachingSchedule) {
            return res.status(404).send({
                message: "Schedule not found!",
            });
        }

        await teachingSchedule.setUsers(user_ids);

        res.status(200).send({
            message: "Users for the schedule were updated successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating users for the schedule!",
        });
    }
}

// ? Mark one schedule as done
exports.markOneAsDone = async (req, res) => {
    const id = req.params.id; // ID of the user_teaching_schedule record

    if(!id) {
        return res.status(400).send({
            message: "ID is required!",
        });
    }

    try {
        const userTeachingSchedule = await UserTeachingSchedule.findByPk(id);

        if (!userTeachingSchedule) {
            return res.status(404).send({
                message: "User Teaching Schedule not found!",
            });
        }

        await userTeachingSchedule.update({
            status: "Selesai",
        });

        res.status(200).send({
            message: "User Teaching Schedule was updated successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating User Teaching Schedule!",
        });
    }
}

// ? Mark multiple schedules as done
exports.markMultipleAsDone = async (req, res) => {
    const { user_teaching_schedule_ids } = req.body.data;

    if (!Array.isArray(user_teaching_schedule_ids)) {
        return res.status(400).send({
            message: "An array of User Teaching Schedule IDs is required!",
        });
    }

    try {
        const userTeachingSchedules = await UserTeachingSchedule.findAll({
            where: {
                id: user_teaching_schedule_ids,
            }
        });

        if (userTeachingSchedules.length === 0) {
            return res.status(404).send({
                message: "No User Teaching Schedules found!",
            });
        }

        await UserTeachingSchedule.update({
            status: "Selesai",
        }, {
            where: {
                id: user_teaching_schedule_ids,
            }
        });

        res.status(200).send({
            message: "User Teaching Schedules were updated successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating User Teaching Schedules!",
        });
    }
};


// ? Delete the schedules associated with a user
exports.deleteSchedulesForUser = async (req, res) => {
    const { user_id, teaching_schedule_ids  } = req.body.data;

    if (!user_id || !Array.isArray(teaching_schedule_ids)) {
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
        for (const id of teaching_schedule_ids) {
            const hasSchedule = await user.hasTeachingSchedule(id);
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

        await user.removeTeachingSchedules(schedulesToRemove);

        res.status(200).send({
            message: `Successfully removed ${schedulesToRemove.length} teaching schedule(s) from the user.`,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting schedules for the user!"
        });
    }
};

// ? Delete the users associated with a schedule
exports.deleteUsersForSchedule = async (req, res) => {
    const { teaching_schedule_id, user_ids } = req.body.data;

    if (!teaching_schedule_id || !Array.isArray(user_ids)) {
        return res.status(400).send({
            message: "Schedule ID and an array of user IDs are required!",
        });
    }

    try {
        const teachingSchedule  = await TeachingSchedule.findByPk(teaching_schedule_id);
        if (!teachingSchedule ) {
            return res.status(404).send({
                message: "Schedule not found!",
            });
        }

        // Verify existing associations
        const usersToRemove = [];
        for (const id of user_ids) {
            const hasUser = await teachingSchedule.hasUser(id);
            if (hasUser) {
                usersToRemove.push(id);
            }
        }

        if (usersToRemove.length === 0) {
            return res.status(404).send({
                message: "No users found to remove for this schedule.",
            });
        }

        await teachingSchedule.removeUsers(usersToRemove);

        res.status(200).send({
            message: "Users for the schedule were deleted successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting users for the schedule!",
        });
    }
}