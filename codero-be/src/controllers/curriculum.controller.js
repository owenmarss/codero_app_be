const db = require("../models");
const Curriculum = db.curriculum;
const Session = db.session;

// Create and Save a new Curriculum
exports.createCurriculum = (req, res) => {
    const { curriculum_title, curriculum_type, tools, total_session } = req.body.data;
    console.log(req.body.data);

    // Validate request
    if (!curriculum_title || !curriculum_type || !total_session) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Check if Curriculum already exists
    Curriculum.findOne({
        where: { curriculum_title: curriculum_title },
    })
        .then((curriculum) => {
            if (curriculum) {
                return res.status(400).send({
                    message: "Curriculum already exists!",
                });
            } else {
                // Create a Curriculum
                Curriculum.create({
                    curriculum_title: curriculum_title,
                    curriculum_type: curriculum_type,
                    tools: tools,
                    total_session: total_session,
                })
                    .then(() => {
                        res.status(201).send({
                            message: "Curriculum was created successfully!",
                        });
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message ||
                                "Some error occurred while creating the Curriculum.",
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Curriculum.",
            });
        });
};

// Get all Curriculum
exports.getAllCurriculum = (req, res) => {
    Curriculum.findAll()
        .then((curriculum) => {
            res.status(200).send(curriculum);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Curriculum.",
            });
        });
};

// Get all Curriculum with curriculum_type = "Coding"
exports.getAllCurriculumCoding = (req, res) => {
    Curriculum.findAll({
        where: { curriculum_type: "Coding" },
    })
        .then((curriculum) => {
            res.status(200).send(curriculum);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Curriculum.",
            });
        });
}

// Get all Curriculum with curriculum_type = "Robotic"
exports.getAllCurriculumRobotic = (req, res) => {
    Curriculum.findAll({
        where: { curriculum_type: "Robotic" },
    })
        .then((curriculum) => {
            res.status(200).send(curriculum);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Curriculum.",
            });
        });
}

// Get a Curriculum by id
exports.getCurriculumById = (req, res) => {
    const id = req.params.id;

    Curriculum.findByPk(id, {
        include: [
            {
                model: Session,
                as: "session",
                attributes: [
                    "id",
                    "session_title",
                    "index_session",
                ],
            },
        ],
        order: [
            [{ model: Session, as: "session" }, "index_session", "ASC"],
        ],
    })
        .then((curriculum) => {
            if (!curriculum) {
                return res.status(404).send({
                    message: "Curriculum not found!",
                });
            }

            res.status(200).send(curriculum);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Curriculum.",
            });
        });
};

// Update a Curriculum by id
exports.updateCurriculum = (req, res) => {
    const id = req.params.id;
    const { curriculum_title, curriculum_type, tools, total_session } = req.body.data;

    // Validate request
    if (!curriculum_title || !curriculum_type || !total_session) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Curriculum.update(
        {
            curriculum_title: curriculum_title,
            curriculum_type: curriculum_type,
            tools: tools,
            total_session: total_session,
        },
        {
            where: { id: id },
        }
    )
        .then(([num]) => {
            if (num == 1) {
                res.status(200).send({
                    message: "Curriculum was updated successfully.",
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Curriculum with id=${id}. Maybe Curriculum was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while updating Curriculum.",
            });
        });
}

// Delete a Curriculum by id
exports.deleteCurriculum = (req, res) => {
    const id = req.params.id;

    Curriculum.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    message: "Curriculum was deleted successfully!",
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Curriculum with id=${id}. Maybe Curriculum was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while deleting Curriculum.",
            });
        });
};