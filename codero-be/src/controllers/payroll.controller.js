const db = require("../models");
const Payroll = db.payroll;
const Presensi = db.presensi;
const UserSchedule = db.userSchedule;
const User = db.user;
const Schedule = db.schedule;
const { Op } = require("sequelize");

// Create and Save a new Payroll
exports.createPayroll = async (req, res) => {
    const {
        user_id,
        nominal,
        tanggal_mulai,
        tanggal_selesai,
        periode_bulan,
        periode_tahun,
    } = req.body.data;

    if (
        !user_id ||
        !nominal ||
        !tanggal_mulai ||
        !tanggal_selesai ||
        !periode_bulan ||
        !periode_tahun
    ) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    try {
        const presensiData = await Presensi.findAll({
            where: {
                tanggal: {
                    [Op.between]: [tanggal_mulai, tanggal_selesai],
                },
                status: "Masuk",
                status_datang: "Sudah Isi",
                status_pulang: "Sudah Isi",
            },
            include: [
                {
                    model: UserSchedule,
                    as: "userSchedule",
                    where: { user_id: user_id },
                },
            ],
        });

        const jumlah_presensi = presensiData.length;
        const total_nominal = jumlah_presensi * nominal;

        const payroll = await Payroll.create({
            nominal: nominal,
            jumlah_presensi: jumlah_presensi,
            total_nominal: total_nominal,
            tanggal_mulai: tanggal_mulai,
            tanggal_selesai: tanggal_selesai,
            periode_bulan: periode_bulan,
            periode_tahun: periode_tahun,
            status_pembayaran: "Belum Dibayar"
        });

        await Promise.all(
            presensiData.map((presensi) => {
                presensi.payroll_id = payroll.id;
                return presensi.save();
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
                    model: Presensi,
                    as: "presensi",
                    attributes: [
                        "id",
                        "tanggal",
                        "status",
                        "status_datang",
                        "status_pulang",
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
                                        "jenis_client",
                                        "jenis_sesi",
                                        "jenis_kegiatan",
                                        "hari",
                                        "tanggal",
                                        "jam_mulai",
                                        "jam_selesai",
                                        "status",
                                    ]
                                },
                                {
                                    model: User,
                                    as: "users",
                                    attributes: [
                                        "id",
                                        "namaDepan",
                                        "namaBelakang",
                                        "posisi",
                                        "jam_kerja",
                                        "cabang",
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
                    model: Presensi,
                    as: "presensi",
                    attributes: [
                        "id",
                        "tanggal",
                        "status",
                        "status_datang",
                        "status_pulang",
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
                                        "jenis_client",
                                        "jenis_sesi",
                                        "jenis_kegiatan",
                                        "hari",
                                        "tanggal",
                                        "jam_mulai",
                                        "jam_selesai",
                                        "status",
                                    ]
                                },
                                {
                                    model: User,
                                    as: "users",
                                    attributes: [
                                        "id",
                                        "namaDepan",
                                        "namaBelakang",
                                        "posisi",
                                        "jam_kerja",
                                        "cabang",
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
                    model: Presensi,
                    as: "presensi",
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
                                        "jenis_client",
                                        "jenis_sesi",
                                        "jenis_kegiatan",
                                        "hari",
                                        "tanggal",
                                        "jam_mulai",
                                        "jam_selesai",
                                        "status",
                                    ]
                                },
                                {
                                    model: User,
                                    as: "users",
                                    attributes: [
                                        "id",
                                        "namaDepan",
                                        "namaBelakang",
                                        "posisi",
                                        "jam_kerja",
                                        "cabang",
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

// Update Pembayaran By ID
exports.updatePembayaranById = async (req, res) => {
    const id = req.params.id;
    const { status_pembayaran, tanggal_pembayaran, jam_pembayaran } = req.body.data;

    try {
        const payroll = await Payroll.findByPk(id);

        if (!payroll) {
            return res.status(404).send({
                message: `Payroll with id ${id} was not found.`,
            });
        }

        payroll.status_pembayaran = "Sudah Dibayar";
        payroll.tanggal_pembayaran = tanggal_pembayaran || new Date().toISOString().split("T")[0];
        payroll.jam_pembayaran = jam_pembayaran || new Date().toTimeString().split(" ")[0];;

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