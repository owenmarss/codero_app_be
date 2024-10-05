const db = require("../models");
const Materi = db.materi;
const Pertemuan = db.pertemuan;

// Create Pertemuan
exports.createPertemuan = (req, res) => {
    const {
        id_materi,
        index_pertemuan,
        judul_pertemuan,
        isi_pertemuan,
        link_source,
        link_video,
    } = req.body.data;

    if (!id_materi || !index_pertemuan || !judul_pertemuan) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    Materi.findByPk(id_materi)
        .then((materi) => {
            if (!materi) {
                res.status(404).send({
                    message: "Materi not found!",
                });
            } else {
                // Create a Pertemuan
                Pertemuan.create({
                    id_materi: id_materi,
                    index_pertemuan: index_pertemuan,
                    judul_pertemuan: judul_pertemuan,
                    isi_pertemuan: isi_pertemuan,
                    link_source: link_source,
                    link_video: link_video,
                })
                    .then(() => {
                        res.status(201).send({
                            message: "Pertemuan was created successfully!",
                        });
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message ||
                                "Some error occurred while creating the Pertemuan.",
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while checking the Materi.",
            });
        });
};

// Get all Pertemuan
exports.getAllPertemuan = (req, res) => {
    Pertemuan.findAll({
        include: [
            {
                model: Materi,
                as: "materi",
                attributes: ["id", "judul_materi"],
            },
        ],
    })
        .then((pertemuan) => {
            res.status(200).send(pertemuan);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Pertemuan.",
            });
        });
}

// Get Pertemuan by Materi ID
exports.getAllPertemuanByMateriId = (req, res) => {
    const id = req.params.id;

    Pertemuan.findAll({
        where: { id_materi: id },
        include: [
            {
                model: Materi,
                as: "materi",
                attributes: ["id", "judul_materi"],
            },
        ],
    })
        .then((pertemuan) => {
            if (pertemuan.length === 0) {
                res.status(404).send({
                    message: "Pertemuan not found!",
                });
            }

            res.status(200).send(pertemuan);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Pertemuan.",
            });
        });
};

// Get Pertemuan by ID
exports.getPertemuanById = (req, res) => {
    const id = req.params.id;

    Pertemuan.findByPk(id, {
        attributes: [
            "id",
            "id_materi",
            "index_pertemuan",
            "judul_pertemuan",
            "isi_pertemuan",
            "link_source",
            "link_video",
        ],
        include: [
            {
                model: Materi,
                as: "materi",
                attributes: ["id", "judul_materi"],
            },
        ],
    })
        .then((pertemuan) => {
            if (!pertemuan) {
                return res.status(404).send({
                    message: "Pertemuan not found!",
                });
            }

            res.status(200).send(pertemuan);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Pertemuan.",
            });
        });
};

// Update Pertemuan by ID
exports.updatePertemuan = (req, res) => {
    const id = req.params.id;
    const { id_materi, judul_pertemuan, index_pertemuan, isi_pertemuan, link_source, link_video } = req.body.data;

    if (!id_materi || !judul_pertemuan) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Pertemuan.update(
        {
            id_materi: id_materi,
            judul_pertemuan: judul_pertemuan,
            index_pertemuan: index_pertemuan,
            isi_pertemuan: isi_pertemuan,
            link_source: link_source,
            link_video: link_video,
        },
        { where: { id: id } },
    )
        .then(([num]) => {
            if (num == 1) {
                res.status(200).send({
                    message: "Pertemuan was updated successfully.",
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Pertemuan with id=${id}. Maybe Pertemuan was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Error updating Pertemuan with id=" + id,
            });
        });
};

// Delete Pertemuan by ID
exports.deletePertemuan = (req, res) => {
    const id = req.params.id;

    Pertemuan.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    message: "Pertemuan was deleted successfully!",
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Pertemuan with id=${id}. Maybe Pertemuan was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Could not delete Pertemuan with id=" + id,
            });
        });
};