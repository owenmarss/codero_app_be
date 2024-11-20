const { where } = require("sequelize");
const db = require("../models");
const Presensi = db.presensi;
const UserSchedule = db.userSchedule;
const User = db.user;
const Schedule = db.schedule;
const Partner = db.partner;
const Student = db.student;
const Materi = db.materi;

// Create and Save a new Presensi
exports.createPresensi = async (req, res) => {
    const { user_schedule_id, tanggal, jam_datang, status, status_datang } = req.body.data;

    try {
        const userSchedule = await UserSchedule.findByPk(user_schedule_id);
        if (!userSchedule) {
            return res.status(404).send({
                message: "User Schedule not found!",
            });
        }

        const presensi = await Presensi.create({
            user_schedule_id: user_schedule_id,
            tanggal: tanggal,
            jam_datang: jam_datang,
            status: status,
            status_datang: status_datang,
        });

        res.status(201).send({
            message: "Presensi was created successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while creating the Presensi.",
        });
    }
};

// Get all Presensi
exports.getAllPresensi = async (req, res) => {
    try {
        const presensi = await Presensi.findAll({
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
                                "namaDepan",
                                "namaBelakang",
                                "posisi",
                                "jam_kerja",
                                "cabang",
                            ],
                        },
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
                            ],
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
                            ]
                        },
                    ],
                },
            ],
        });

        res.status(200).send(presensi);
    } catch (err) {
        console.error("Error in getAllPresensi:", err); // Log error
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Presensi.",
        });
    }
};

// Get a single Presensi with an id
exports.getPresensiById = async (req, res) => {
    const id = req.params.id;

    try {
        const presensi = await Presensi.findByPk(id, {
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
                                "namaDepan",
                                "namaBelakang",
                                "posisi",
                                "jam_kerja",
                                "cabang",
                            ],
                        },
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
                            ],
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
                            ]
                        },
                    ],
                },
            ]
        })

        if (!presensi) {
            return res.status(404).send({
                message: "Presensi not found with id=" + id,
            });
        }

        res.status(200).send(presensi);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Presensi with id=" + id,
        });
    }
};

// Get presensi by User ID
exports.getPresensiByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send({
                message: `User with ID = ${userId} not found!`,
            });
        }

        const presensi = await Presensi.findAll({
            include: [{
                model: UserSchedule,
                as: "userSchedule",
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
            }]
        });

        if (!presensi || presensi.length === 0) {
            return res.status(404).send({
                message: `Presensi for user with ID = ${userId} not found!`
            });
        }

        res.status(200).send(presensi);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Presensi with user_id=" + userId,
        });
    }
}

// Get presensi by Schedule
exports.getPresensiByScheduleId = async (req, res) => {
    const scheduleId = req.params.scheduleId;

    try {
        const schedule = await Schedule.findByPk(scheduleId);

        if (!schedule) {
            return res.status(404).send({
                message: `Schedule with ID = ${scheduleId} not found!`,
            });
        }

        const presensi = await Presensi.findAll({
            include: [{
                model: UserSchedule,
                as: "userSchedule",
                where: { schedule_id: scheduleId },
                include: [
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
                    },
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
                    }
                ]
            }]
        });

        if (!presensi || presensi.length === 0) {
            return res.status(404).send({
                message: `Presensi for schedule with ID = ${scheduleId} not found!`
            });
        }

        res.status(200).send(presensi);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Presensi with schedule_id=" + scheduleId,
        });
    }
}

// Update jam_datang from a Presensi by the id in the request
exports.updateJamDatang = async (req, res) => {
    const id = req.params.id;
    const { tanggal, status, jam_datang, status_datang } = req.body.data;

    try {
        const presensi = await Presensi.findByPk(id);

        if (!presensi) {
            return res.status(404).send({
                message: "Presensi not found!",
            });
        }

        presensi.tanggal = new Date().toISOString().split("T")[0];
        presensi.status = "Masuk";
        presensi.jam_datang = jam_datang || new Date().toTimeString().split(" ")[0];
        presensi.status_datang = status_datang || "Sudah Isi";

        await presensi.save();

        res.status(200).send({
            message: "Presensi was updated successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: "Error updating Presensi with id=" + id,
        });
    }
};

// Update jam_pulang from a Presensi by the id in the request
exports.updateJamPulang = async (req, res) => {
    const id = req.params.id;
    const { jam_pulang, status_pulang } = req.body.data;

    try {
        const presensi = await Presensi.findByPk(id);

        if (!presensi) {
            return res.status(404).send({
                message: "Presensi not found!",
            });
        }

        if(!presensi.jam_datang || presensi.status_datang === "Belum Isi") {
            return res.status(400).send({
                message: "Presensi belum diisi jam datang!",
            });
        }

        presensi.jam_pulang = jam_pulang || new Date().toTimeString().split(" ")[0];
        presensi.status_pulang = status_pulang || "Sudah Isi";

        await presensi.save();

        res.status(200).send({
            message: "Presensi was updated successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: "Error updating Presensi with id=" + id,
        });
    }
};

// 