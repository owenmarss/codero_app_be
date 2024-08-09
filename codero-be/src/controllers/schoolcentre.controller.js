const e = require("express");
const db = require("../models");
const SchoolCentre = db.schoolCentre;
const Op = db.Sequelize.Op;

// Create and Save a new School 
exports.create = (req, res) => {
    console.log(req.body.data);

    if (!req.body.data.nama || !req.body.data.jenis || !req.body.data.alamat || !req.body.data.daerah || !req.body.data.jenjang || !req.body.data.kelas || !req.body.data.tipeMateri || !req.body.data.materi) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const schoolCentre = {
        nama: req.body.data.nama,
        jenis: req.body.data.jenis,
        alamat: req.body.data.alamat,
        daerah: req.body.data.daerah,
        jenjang: req.body.data.jenjang,
        kelas: req.body.data.kelas,
        tipeMateri: req.body.data.tipeMateri,
        materi: req.body.data.materi
    };

    SchoolCentre.create(schoolCentre)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the School or Centre.",
            });
        });
};

exports.findAll = (req, res) => {
    const { nama, jenis, alamat, daerah, jenjang, kelas, tipeMateri, materi, sort, order = "ASC", and, or } = req.query;
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
        if (jenis) {
            condition.jenis = { [Op.like]: `%${jenis}%` };
        }
        if (alamat) {
            condition.alamat = { [Op.like]: `%${alamat}%` };
        }
        if (daerah) {
            condition.daerah = { [Op.like]: `%${daerah}%` };
        }
        if (jenjang) {
            condition.jenjang = { [Op.like]: `%${jenjang}%` };
        }
        if (kelas) {
            condition.kelas = { [Op.like]: `%${kelas}%` };
        }
        if (tipeMateri) {
            condition.tipeMateri = { [Op.like]: `%${tipeMateri}%` };
        }
        if (materi) {
            condition.materi = { [Op.like]: `%${materi}%` };
        }
    }

    let orderCondition = [];
    if (sort) {
        orderCondition = [[sort, order.toUpperCase()]];
    }

    SchoolCentre.findAll({
        where: condition,
        order: orderCondition,
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving users.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    SchoolCentre.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving School or Centre with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const { nama, jenis, alamat, daerah, jenjang, kelas, tipeMateri, materi } = req.body;

    const updateData = {};
    if (nama) updateData.nama = nama;
    if (jenis) updateData.jenis = jenis;
    if (alamat) updateData.alamat = alamat;
    if (daerah) updateData.daerah = daerah;
    if (jenjang) updateData.jenjang = jenjang;
    if (kelas) updateData.kelas = kelas;
    if (tipeMateri) updateData.tipeMateri = tipeMateri;
    if (materi) updateData.materi = materi;

    SchoolCentre.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "School or Centre was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update School or Centre with id=${id}. Maybe School or Centre was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating School or Centre with id=" + id,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    SchoolCentre.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "School or Centre was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete School or Centre with id=${id}. Maybe School or Centre was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete School or Centre with id=" + id,
            });
        });
};

exports.deleteAll = (req, res) => {
    SchoolCentre.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} School or Centre were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all School or Centre.",
            });
        });
};