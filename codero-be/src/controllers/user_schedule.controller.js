const db = require("../models");
const UserSchedule = db.userSchedule;
const User = db.user;
const Schedule = db.schedule;
const Attendance = db.attendance;
const Partner = db.partner;
const Student = db.student;
const Curriculum = db.curriculum;
const Op = db.Sequelize.Op;


// * Assign a schedule to users
exports.assignScheduleToUsers = async (req, res) => {
    const { schedule_id, user_ids, date } = req.body.data;

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


        const userSchedules = await UserSchedule.findAll({
            where: {
                user_id: user_ids,
                schedule_id: schedule_id,
            }
        });

        const attendanceData = userSchedules.map((userSchedule) => ({
            user_schedule_id: userSchedule.id,
            date: date || null,
            arrival_time: "Belum Isi",
            departure_time: "Belum Isi",
            payroll_id: null,
        }));

        await Attendance.bulkCreate(attendanceData);

        res.status(200).send({
            message: "Users were assigned to the schedule successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error assigning users to the schedule!",
        });
    }
}

// ? Get all assigned schedules
exports.getAllAssignedSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.findAll({
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

        if(schedules.length === 0 || !schedules) {
            return res.status(404).send({
                message: "No schedules found!",
            });
        }

        res.status(200).send(schedules);
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
                    model: Schedule,
                    as: "schedules",
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
                res.status(200).send(user.schedules);
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
    const schedule_id = req.params.id;

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
                    attributes: ["id", "first_name", "last_name", "position", "working_hour", "branch"],
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
};

// ? Update the schedules associated with a user
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

// ? Update the users associated with a schedule
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

// ? Delete the schedules associated with a user
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

// ? Delete the users associated with a schedule
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