const db = require("../models");
const Materi = db.materi;
const Pertemuan = db.pertemuan;

// Create and Save a new Materi
exports.createMateri = (req, res) => {
    const { judul_materi, jenis_materi, tools, jumlah_pertemuan } = req.body.data;
    console.log(req.body.data);

    // Validate request
    if (!judul_materi || !jenis_materi || !jumlah_pertemuan) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Check if materi already exists
    Materi.findOne({
        where: { judul_materi: judul_materi },
    })
        .then((materi) => {
            if (materi) {
                return res.status(400).send({
                    message: "Materi already exists!",
                });
            } else {
                // Create a Materi
                Materi.create({
                    judul_materi: judul_materi,
                    jenis_materi: jenis_materi,
                    tools: tools,
                    jumlah_pertemuan: jumlah_pertemuan,
                })
                    .then(() => {
                        res.status(201).send({
                            message: "Materi was created successfully!",
                        });
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message ||
                                "Some error occurred while creating the Materi.",
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Materi.",
            });
        });
};

// Get all Materi
exports.getAllMateri = (req, res) => {
    Materi.findAll()
        .then((materi) => {
            res.status(200).send(materi);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Materi.",
            });
        });
};

// Get all Materi with jenis_materi = "Coding"
exports.getAllMateriCoding = (req, res) => {
    Materi.findAll({
        where: { jenis_materi: "Coding" },
    })
        .then((materi) => {
            res.status(200).send(materi);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Materi.",
            });
        });
}

// Get all Materi with jenis_materi = "Robotic"
exports.getAllMateriRobotic = (req, res) => {
    Materi.findAll({
        where: { jenis_materi: "Robotic" },
    })
        .then((materi) => {
            res.status(200).send(materi);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Materi.",
            });
        });
}

// Get a Materi by id
exports.getMateriById = (req, res) => {
    const id = req.params.id;

    Materi.findByPk(id, {
        include: [
            {
                model: Pertemuan,
                as: "pertemuan",
                attributes: [
                    "id",
                    "judul_pertemuan",
                    "index_pertemuan",
                ],
            },
        ],
        order: [
            [{ model: Pertemuan, as: "pertemuan" }, "index_pertemuan", "ASC"],
        ],
    })
        .then((materi) => {
            if (!materi) {
                return res.status(404).send({
                    message: "Materi not found!",
                });
            }

            res.status(200).send(materi);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Materi.",
            });
        });
};

// Update a Materi by id
exports.updateMateri = (req, res) => {
    const id = req.params.id;
    const { judul_materi, jenis_materi, tools, jumlah_pertemuan } = req.body.data;

    // Validate request
    if (!judul_materi || !jenis_materi || !jumlah_pertemuan) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Materi.update(
        {
            judul_materi: judul_materi,
            jenis_materi: jenis_materi,
            tools: tools,
            jumlah_pertemuan: jumlah_pertemuan,
        },
        {
            where: { id: id },
        }
    )
        .then(([num]) => {
            if (num == 1) {
                res.status(200).send({
                    message: "Materi was updated successfully.",
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Materi with id=${id}. Maybe Materi was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while updating Materi.",
            });
        });
}

// Delete a Materi by id
exports.deleteMateri = (req, res) => {
    const id = req.params.id;

    Materi.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    message: "Materi was deleted successfully!",
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Materi with id=${id}. Maybe Materi was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while deleting Materi.",
            });
        });
};