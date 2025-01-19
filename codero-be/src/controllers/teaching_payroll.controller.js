const db = require("../models");
const TeachingPayroll  = db.teachingPayroll;
const TeachingAttendance  = db.teachingAttendance;
const TeachingSchedule  = db.teachingSchedule;
const UserTeachingSchedule  = db.userTeachingSchedule;
const User = db.user;
const { Op } = require("sequelize");

// Create and Save a new Payroll
exports.createTeachingPayroll = async (req, res) => {
    const {
        user_id,
        amount,
        start_date,
        end_date,
        month_period,
        year_period,
    } = req.body.data;

    if (
        !user_id ||
        !amount ||
        !start_date ||
        !end_date ||
        !month_period ||
        !year_period
    ) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    try {
        const attendanceData = await TeachingAttendance.findAll({
            where: {
                date: {
                    [Op.between]: [start_date, end_date],
                },
                status: "Masuk",
                arrival_status: "Sudah Isi",
                departure_status: "Sudah Isi",
            },
            include: [
                {
                    model: UserTeachingSchedule,
                    as: "userTeachingSchedule",
                    where: { user_id: user_id },
                },
            ],
        });

        const total_attendance = attendanceData.length;
        const total_amount = total_attendance * amount;

        const teachingPayroll  = await TeachingPayroll.create({
            amount: amount,
            total_attendance: total_attendance,
            total_amount: total_amount,
            start_date: start_date,
            end_date: end_date,
            month_period: month_period,
            year_period: year_period,
            payment_status: "Belum Dibayar"
        });

        await Promise.all(
            attendanceData.map((attendance) => {
                attendance.teaching_payroll_id = teachingPayroll.id;
                return attendance.save();
            })
        );

        return res.status(201).send({
            message: "Payroll was created successfully." , teachingPayroll,
        });
    } catch (err) {
        return res.status(500).send({
            message:
                err.message ||
                "Some error occurred while creating the Payroll.",
        });
    }
};

// Retrieve all Payrolls from the database.
exports.getAllTeachingPayroll = async (req, res) => {
    try {
        const teachingPayroll = await TeachingPayroll.findAll({
            include: [
                {
                    model: TeachingAttendance,
                    as: "teachingAttendances",
                    attributes: [
                        "id",
                        "date",
                        "status",
                        "arrival_status",
                        "departure_status",
                    ],
                    include: [
                        {
                            model: UserTeachingSchedule,
                            as: "userTeachingSchedule",
                            include: [
                                {
                                    model: TeachingSchedule,
                                    as: "teachingSchedule",
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
                                    ]
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
                                }
                            ]
                        }
                    ]
                },
            ],
        });

        if (teachingPayroll.length === 0) {
            return res.status(404).send({
                message: "No Payrolls found.",
            });
        }

        res.status(200).send(teachingPayroll);
    } catch (err) {
        return res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Payrolls.",
        });
    }
};

// Find a single Payroll with an id
exports.getTeachingPayrollById = async (req, res) => {
    const id = req.params.id;

    try {
        const teachingPayroll = await TeachingPayroll.findByPk(id, {
            include: [
                {
                    model: TeachingAttendance,
                    as: "teachingAttendances",
                    attributes: [
                        "id",
                        "date",
                        "status",
                        "arrival_status",
                        "departure_status",
                    ],
                    include: [
                        {
                            model: UserTeachingSchedule,
                            as: "userTeachingSchedule",
                            include: [
                                {
                                    model: TeachingSchedule,
                                    as: "teachingSchedule",
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
                                    ]
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
                                }
                            ]
                        }
                    ]
                },
            ],
        });

        if (!teachingPayroll) {
            return res.status(404).send({
                message: `Payroll with id ${id} was not found.`,
            });
        }

        res.status(200).send(teachingPayroll);
    } catch (err) {
        return res.status(500).send({
            message:
                err.message || `Error retrieving Payroll with id=${id}.`,
        });
    }
};

// Get all Payrolls by User ID
exports.getTeachingPayrollByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findByPk(userId);
        if(!user) {
            return res.status(404).send({
                message: `User with id ${userId} was not found.`,
            });
        }

        const teachingPayroll = await TeachingPayroll.findAll({
            include: [
                {
                    model: TeachingAttendance,
                    as: "teachingAttendances",
                    required: true,
                    include: [
                        {
                            model: UserTeachingSchedule,
                            as: "userTeachingSchedule",
                            required: true,
                            where: { user_id: userId },
                            include: [
                                {
                                    model: TeachingSchedule,
                                    as: "teachingSchedule",
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
                                    ]
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
                                }
                            ]
                        }
                    ]
                },
            ],
        });

        res.status(200).send(teachingPayroll);
    } catch (err) {
        return res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Payrolls.",
        });
    }
};

// Update Payment By ID
exports.updatePaymentById = async (req, res) => {
    const id = req.params.id;
    // const { payment_status, payment_date, payment_time } = req.body.data;

    try {
        const teachingPayroll = await TeachingPayroll.findByPk(id);

        if (!teachingPayroll) {
            return res.status(404).send({
                message: `Teaching Payroll with id ${id} was not found.`,
            });
        }

        teachingPayroll.payment_status = "Sudah Dibayar";
        teachingPayroll.payment_date = new Date().toISOString().split("T")[0];
        teachingPayroll.payment_time = new Date().toTimeString().split(" ")[0];;

        await teachingPayroll.save();

        return res.status(200).send({
            message: `Payroll with id ${id} was updated successfully.`,
        });
    } catch (err) {
        return res.status(500).send({
            message:
                err.message || `Error updating Payroll with id=${id}.`,
        });
    }
};

// Delete a Payroll with the specified id in the request
exports.deleteTeachingPayrollById = async (req, res) => {
    const id = req.params.id;

    try {
        const teachingPayroll = await TeachingPayroll.findByPk(id);

        if (!teachingPayroll) {
            return res.status(404).send({
                message: `Payroll with id ${id} was not found.`,
            });
        }

        await teachingPayroll.destroy();

        return res.status(200).send({
            message: `Payroll with id ${id} was deleted successfully.`,
        });
    } catch (err) {
        return res.status(500).send({
            message:
                err.message || `Error deleting Payroll with id=${id}.`,
        });
    }
};

// Delete all Payrolls from the database.
exports.deleteAllTeachingPayroll  = async (req, res) => {
    try {
        await TeachingPayroll.destroy({
            where: {},
            truncate: false,
        });

        return res.status(200).send({
            message: "All Payrolls were deleted successfully.",
        });
    } catch (err) {
        return res.status(500).send({
            message:
                err.message || "Some error occurred while removing all Payrolls.",
        });
    }
};