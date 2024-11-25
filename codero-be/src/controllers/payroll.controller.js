const db = require("../models");
const Payroll = db.payroll;
const Attendance = db.attendance;
const UserSchedule = db.userSchedule;
const User = db.user;
const Schedule = db.schedule;
const { Op } = require("sequelize");

// Create and Save a new Payroll
exports.createPayroll = async (req, res) => {
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
        const attendanceData = await Attendance.findAll({
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
                    model: UserSchedule,
                    as: "userSchedule",
                    where: { user_id: user_id },
                },
            ],
        });

        const total_attendance = attendanceData.length;
        const total_amount = total_attendance * amount;

        const payroll = await Payroll.create({
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
                attendance.payroll_id = payroll.id;
                return attendance.save();
            })
        );

        return res.status(201).send({
            message: "Payroll was created successfully." , payroll,
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
exports.getAllPayroll = async (req, res) => {
    try {
        const payroll = await Payroll.findAll({
            include: [
                {
                    model: Attendance,
                    as: "attendance",
                    attributes: [
                        "id",
                        "date",
                        "status",
                        "arrival_status",
                        "departure_status",
                    ],
                    include: [
                        {
                            model: UserSchedule,
                            as: "userSchedule",
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

        res.status(200).send(payroll);
    } catch (err) {
        return res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Payrolls.",
        });
    }
};

// Find a single Payroll with an id
exports.getPayrollById = async (req, res) => {
    const id = req.params.id;

    try {
        const payroll = await Payroll.findByPk(id, {
            include: [
                {
                    model: Attendance,
                    as: "attendance",
                    attributes: [
                        "id",
                        "date",
                        "status",
                        "arrival_status",
                        "departure_status",
                    ],
                    include: [
                        {
                            model: UserSchedule,
                            as: "userSchedule",
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

        if (!payroll) {
            return res.status(404).send({
                message: `Payroll with id ${id} was not found.`,
            });
        }

        res.status(200).send(payroll);
    } catch (err) {
        return res.status(500).send({
            message:
                err.message || `Error retrieving Payroll with id=${id}.`,
        });
    }
};

// Get all Payrolls by User ID
exports.getPayrollByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findByPk(userId);
        if(!user) {
            return res.status(404).send({
                message: `User with id ${userId} was not found.`,
            });
        }

        const payroll = await Payroll.findAll({
            include: [
                {
                    model: Attendance,
                    as: "attendance",
                    required: true,
                    include: [
                        {
                            model: UserSchedule,
                            as: "userSchedule",
                            required: true,
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

        res.status(200).send(payroll);
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
        const payroll = await Payroll.findByPk(id);

        if (!payroll) {
            return res.status(404).send({
                message: `Payroll with id ${id} was not found.`,
            });
        }

        payroll.payment_status = "Sudah Dibayar";
        payroll.payment_date = new Date().toISOString().split("T")[0];
        payroll.payment_time = new Date().toTimeString().split(" ")[0];;

        await payroll.save();

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
exports.deletePayrollById = async (req, res) => {
    const id = req.params.id;

    try {
        const payroll = await Payroll.findByPk(id);

        if (!payroll) {
            return res.status(404).send({
                message: `Payroll with id ${id} was not found.`,
            });
        }

        await payroll.destroy();

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
exports.deleteAllPayroll = async (req, res) => {
    try {
        await Payroll.destroy({
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