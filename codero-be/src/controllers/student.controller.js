const db = require("../models");
const Student = db.student;
const Materi = db.materi;
const Op = db.Sequelize.Op;

// Create and Save a new Student
exports.create = (req, res) => {
    const {
        nama,
        tempat_lahir,
        tanggal_lahir,
        umur,
        jenjang,
        kelas,
        alamat,
        nama_sekolah,
        nama_ortu,
        no_telp_ortu,
        no_telp_anak,
        id_materi,
    } = req.body.data;

    // Validate request
    if (!nama) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a Student
    Student.create({
        nama: nama,
        tempat_lahir: tempat_lahir,
        tanggal_lahir: tanggal_lahir,
        umur: umur,
        jenjang: jenjang,
        kelas: kelas,
        alamat: alamat,
        nama_sekolah: nama_sekolah,
        nama_ortu: nama_ortu,
        no_telp_ortu: no_telp_ortu,
        no_telp_anak: no_telp_anak,
        id_materi: id_materi,
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Student.",
            });
        });
};

// Retrieve all Students from the database.
exports.findAll = (req, res) => {
    const {
        nama,
        tempat_lahir,
        tanggal_lahir,
        umur,
        jenjang,
        kelas,
        alamat,
        nama_sekolah,
        nama_ortu,
        no_telp_ortu,
        no_telp_anak,
        id_materi,
        sort,
        order = "ASC",
        and,
        or,
    } = req.query;
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
        if (nama) {
            condition.nama = { [Op.like]: `%${nama}%` };
        }
        if (tempat_lahir) {
            condition.tempat_lahir = { [Op.like]: `%${tempat_lahir}%` };
        }
        if (tanggal_lahir) {
            condition.tanggal_lahir = { [Op.like]: `%${tanggal_lahir}%` };
        }
        if (umur) {
            condition.umur = { [Op.like]: `%${umur}%` };
        }
        if (jenjang) {
            condition.jenjang = { [Op.like]: `%${jenjang}%` };
        }
        if (kelas) {
            condition.kelas = { [Op.like]: `%${kelas}%` };
        }
        if (alamat) {
            condition.alamat = { [Op.like]: `%${alamat}%` };
        }
        if (nama_sekolah) {
            condition.nama_sekolah = { [Op.like]: `%${nama_sekolah}%` };
        }
        if (nama_ortu) {
            condition.nama_ortu = { [Op.like]: `%${nama_ortu}%` };
        }
        if (no_telp_ortu) {
            condition.no_telp_ortu = { [Op.like]: `%${no_telp_ortu}%` };
        }
        if (no_telp_anak) {
            condition.no_telp_anak = { [Op.like]: `%${no_telp_anak}%` };
        }
        if (id_materi) {
            condition.id_materi = id_materi;
        }
    }

    let orderCondition = [];
    if (sort) {
        orderCondition = [[sort, order.toUpperCase()]];
    }

    Student.findAll({
        where: condition,
        order: orderCondition,
        include: [
            {
                model: Materi,
                as: "materi",
                attributes: ["id", "judul_materi"],
            },
        ],
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving students.",
            });
        });
};

// Find a single Student with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findByPk(id, {
        include: [
            {
                model: Materi,
                as: "materi",
                attributes: ["id", "judul_materi"],
            },
        ],
    })
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Student not found with id " + id,
                });
            }

            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Student with id=" + id,
            });
        });
};

// Update a Student by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const {
        nama,
        tempat_lahir,
        tanggal_lahir,
        umur,
        jenjang,
        kelas,
        alamat,
        nama_sekolah,
        nama_ortu,
        no_telp_ortu,
        no_telp_anak,
        id_materi,
    } = req.body.data;

    // Validate request
    if (!nama) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Student.update(
        {
            nama: nama,
            tempat_lahir: tempat_lahir,
            tanggal_lahir: tanggal_lahir,
            umur: umur,
            jenjang: jenjang,
            kelas: kelas,
            alamat: alamat,
            nama_sekolah: nama_sekolah,
            nama_ortu: nama_ortu,
            no_telp_ortu: no_telp_ortu,
            no_telp_anak: no_telp_anak,
            id_materi: id_materi,
        },
        { where: { id: id } }
    )
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Student was updated successfully.",
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Student with id=" + id,
            });
        });
};

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Student.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    message: "Student was deleted successfully!",
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Student with id=${id}. Maybe Student was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Student with id=" + id,
            });
        });
}

// Delete all Students from the database.
exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Students were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all students.",
            });
        });
};