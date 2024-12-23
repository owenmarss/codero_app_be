const db = require("../models");
const Attendance = db.attendance;
const User = db.user;
const UserSchedule = db.userSchedule;
const Schedule = db.schedule;
const Transport = db.transport;
const Partner = db.partner;
const Student = db.student;
const Curriculum = db.curriculum;
const bcrypt = require("bcryptjs");

// Create and Save a new Attendance
exports.createAttendance = async (req, res) => {
    const { user_schedule_id, date, arrival_time, status, arrival_status } =
        req.body.data;

    try {
        const userSchedule = await UserSchedule.findByPk(user_schedule_id);
        if (!userSchedule) {
            return res.status(404).send({
                message: "User Schedule not found!",
            });
        }

        const attendance = await Attendance.create({
            user_schedule_id: user_schedule_id,
            date: date,
            arrival_time: arrival_time,
            status: status,
            arrival_status: arrival_status,
        });

        res.status(201).send({
            message: "Attendance was created successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while creating the Attendance.",
        });
    }
};

// Get all Attendance
exports.getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findAll({
            include: [
                {
                    model: UserSchedule,
                    as: "userSchedule",
                    include: [
                        {
                            model: User,
                            as: "users",
                            attributes: [
                                "id",
                                "first_name",
                                "last_name",
                                "position",
                                "working_hour",
                                "branch",
                            ],
                        },
                        {
                            model: Schedule,
                            as: "schedules",
                            attributes: [
                                "id",
                                "client_type",
                                "session_type",
                                "activity",
                                "day",
                                "date",
                                "start_time",
                                "finish_time",
                                "status",
                            ],
                            include: [
                                {
                                    model: Partner,
                                    as: "partner",
                                    attributes: ["id", "name", "id_curriculum"],
                                    include: [
                                        {
                                            model: Curriculum,
                                            as: "curriculum",
                                            attributes: [
                                                "id",
                                                "curriculum_title",
                                                "curriculum_type",
                                            ],
                                        },
                                    ],
                                },
                                {
                                    model: Student,
                                    as: "student",
                                    attributes: ["id", "name", "id_curriculum"],
                                    include: [
                                        {
                                            model: Curriculum,
                                            as: "curriculum",
                                            attributes: [
                                                "id",
                                                "curriculum_title",
                                                "curriculum_type",
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        res.status(200).send(attendance);
    } catch (err) {
        console.error("Error in getAllAttendance:", err); // Log error
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving Attendance.",
        });
    }
};

// Get a single Attendance with an id
exports.getAttendanceById = async (req, res) => {
    const id = req.params.id;

    try {
        const attendance = await Attendance.findByPk(id, {
            include: [
                {
                    model: UserSchedule,
                    as: "userSchedule",
                    include: [
                        {
                            model: User,
                            as: "users",
                            attributes: [
                                "id",
                                "first_name",
                                "last_name",
                                "position",
                                "working_hour",
                                "branch",
                            ],
                        },
                        {
                            model: Schedule,
                            as: "schedules",
                            attributes: [
                                "id",
                                "client_type",
                                "session_type",
                                "activity",
                                "day",
                                "date",
                                "start_time",
                                "finish_time",
                                "status",
                            ],
                            include: [
                                {
                                    model: Partner,
                                    as: "partner",
                                    attributes: ["id", "name", "id_curriculum", "address"],
                                    include: [
                                        {
                                            model: Curriculum,
                                            as: "curriculum",
                                            attributes: [
                                                "id",
                                                "curriculum_title",
                                                "curriculum_type",
                                            ],
                                        },
                                    ],
                                },
                                {
                                    model: Student,
                                    as: "student",
                                    attributes: ["id", "name", "id_curriculum", "address"],
                                    include: [
                                        {
                                            model: Curriculum,
                                            as: "curriculum",
                                            attributes: [
                                                "id",
                                                "curriculum_title",
                                                "curriculum_type",
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if (!attendance) {
            return res.status(404).send({
                message: "Attendance not found with id=" + id,
            });
        }

        res.status(200).send(attendance);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Attendance with id=" + id,
        });
    }
};

// Get attendance by User ID
exports.getAttendanceByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send({
                message: `User with ID = ${userId} not found!`,
            });
        }

        const attendance = await Attendance.findAll({
            include: [
                {
                    model: UserSchedule,
                    as: "userSchedule",
                    where: { user_id: userId },
                    include: [
                        {
                            model: Schedule,
                            as: "schedules",
                            attributes: [
                                "id",
                                "client_type",
                                "session_type",
                                "activity",
                                "day",
                                "date",
                                "start_time",
                                "finish_time",
                                "status",
                            ],
                            include: [
                                {
                                    model: Partner,
                                    as: "partner",
                                    attributes: ["id", "name", "id_curriculum", "address"],
                                    include: [
                                        {
                                            model: Curriculum,
                                            as: "curriculum",
                                            attributes: [
                                                "id",
                                                "curriculum_title",
                                                "curriculum_type",
                                            ],
                                        },
                                    ],
                                },
                                {
                                    model: Student,
                                    as: "student",
                                    attributes: ["id", "name", "id_curriculum", "address"],
                                    include: [
                                        {
                                            model: Curriculum,
                                            as: "curriculum",
                                            attributes: [
                                                "id",
                                                "curriculum_title",
                                                "curriculum_type",
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            model: User,
                            as: "users",
                            attributes: [
                                "id",
                                "first_name",
                                "last_name",
                                "position",
                                "working_hour",
                                "branch",
                            ],
                        },
                    ],
                },
            ],
        });

        if (!attendance || attendance.length === 0) {
            return res.status(404).send({
                message: `Attendance for user with ID = ${userId} not found!`,
            });
        }

        res.status(200).send(attendance);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Attendance with user_id=" + userId,
        });
    }
};

// Get Attendance by Schedule
exports.getAttendanceByScheduleId = async (req, res) => {
    const scheduleId = req.params.scheduleId;

    try {
        const schedule = await Schedule.findByPk(scheduleId);

        if (!schedule) {
            return res.status(404).send({
                message: `Schedule with ID = ${scheduleId} not found!`,
            });
        }

        const attendance = await Attendance.findAll({
            include: [
                {
                    model: UserSchedule,
                    as: "userSchedule",
                    where: { schedule_id: scheduleId },
                    include: [
                        {
                            model: User,
                            as: "users",
                            attributes: [
                                "id",
                                "first_name",
                                "last_name",
                                "position",
                                "working_hour",
                                "branch",
                            ],
                        },
                        {
                            model: Schedule,
                            as: "schedules",
                            attributes: [
                                "id",
                                "client_type",
                                "session_type",
                                "activity",
                                "day",
                                "date",
                                "start_time",
                                "finish_time",
                                "status",
                            ],
                        },
                    ],
                },
            ],
        });

        if (!attendance || attendance.length === 0) {
            return res.status(404).send({
                message: `Attendance for schedule with ID = ${scheduleId} not found!`,
            });
        }

        res.status(200).send(attendance);
    } catch (err) {
        res.status(500).send({
            message:
                "Error retrieving Attendance with schedule_id=" + scheduleId,
        });
    }
};

// Update arrival_time from a Attendance by the id in the request
exports.updateArrivalTime = async (req, res) => {
    const id = req.params.id;
    const { password } = req.body.data;

    try {
        const attendance = await Attendance.findByPk(id, {
            include: [
                {
                    model: UserSchedule,
                    as: "userSchedule",
                    include: [
                        {
                            model: User,
                            as: "users",
                            attributes: ["id", "password"],
                        }
                    ]
                }
            ]
        });

        if (!attendance) {
            return res.status(404).send({
                message: "Attendance not found!",
            });
        }

        const user = attendance.userSchedule.users;
        if (!user) {
            return res.status(404).send({
                message: "User not found!",
            });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }

        attendance.date = new Date().toISOString().split("T")[0];
        attendance.status = "Masuk";
        attendance.arrival_time = new Date().toTimeString().split(" ")[0];
        attendance.arrival_status = "Sudah Isi";

        await attendance.save();

        res.status(200).send({
            message: "Attendance was updated successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: "Error updating Attendance with id=" + id,
        });
    }
};

// Update jam_pulang from a Attendance by the id in the request
exports.updateDepartureTime = async (req, res) => {
    const id = req.params.id;
    const { password } = req.body.data;

    try {
        const attendance = await Attendance.findByPk(id, {
            include: [
                {
                    model: UserSchedule,
                    as: "userSchedule",
                    include: [
                        {
                            model: User,
                            as: "users",
                            attributes: ["id", "password"],
                        },
                    ],
                },
            ],
        });

        if (!attendance) {
            return res.status(404).send({
                message: "Attendance not found!",
            });
        }

        const user = attendance.userSchedule.users;
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }

        if (
            !attendance.arrival_time ||
            attendance.arrival_status === "Belum Isi"
        ) {
            return res.status(400).send({
                message: "Attendance belum diisi jam datang!",
            });
        }

        //* Update departure & save
        attendance.departure_time = new Date().toTimeString().split(" ")[0];
        attendance.departure_status = "Sudah Isi";
        await attendance.save();

        //* Check if transport record needs to be created
        // const sessionType = attendance.userSchedule.schedules.session_type;
        // if (
        //     attendance.arrival_time &&
        //     attendance.departure_time &&
        //     attendance.arrival_status === "Sudah Isi" &&
        //     attendance.departure_status === "Sudah Isi"
        // ) {
        //     const transportRecord = await Transport.create({
        //         attendance_id: attendance.id,
        //         type: null,
        //         reimbursement_id: null,
        //     });

        //     console.log("Transport record created:"
        //     );
        // }

        res.status(200).send({
            message: "Attendance was updated successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: "Error updating Attendance with id=" + id,
        });
    }
};
