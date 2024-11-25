const db = require("../models");
const Curriculum = db.curriculum;
const Session = db.session;

// Create Session
exports.createSession = (req, res) => {
    const {
        id_curriculum,
        index_session,
        session_title,
        session_content,
        link_source,
        link_video,
    } = req.body.data;

    if (!id_curriculum || !index_session || !session_title) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    Curriculum.findByPk(id_curriculum)
        .then((curriculum) => {
            if (!curriculum) {
                res.status(404).send({
                    message: "Curriculum not found!",
                });
            } else {
                // Create a Session
                Session.create({
                    id_curriculum: id_curriculum,
                    index_session: index_session,
                    session_title: session_title,
                    session_content: session_content,
                    link_source: link_source,
                    link_video: link_video,
                })
                    .then(() => {
                        res.status(201).send({
                            message: "Session was created successfully!",
                        });
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message ||
                                "Some error occurred while creating the Session.",
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while checking the Curriculum.",
            });
        });
};

// Get all Session
exports.getAllSession = (req, res) => {
    Session.findAll({
        include: [
            {
                model: Curriculum,
                as: "curriculum",
                attributes: ["id", "curriculum_title"],
            },
        ],
    })
        .then((session) => {
            res.status(200).send(session);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Session.",
            });
        });
}

// Get Session by Curriculum ID
exports.getAllSessionByCurriculumId = (req, res) => {
    const id = req.params.id;

    Session.findAll({
        where: { id_curriculum: id },
        include: [
            {
                model: Curriculum,
                as: "curriculum",
                attributes: ["id", "curriculum_title"],
            },
        ],
    })
        .then((session) => {
            if (session.length === 0) {
                res.status(404).send({
                    message: "Session not found!",
                });
            }

            res.status(200).send(session);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Session.",
            });
        });
};

// Get Session by ID
exports.getSessionById = (req, res) => {
    const id = req.params.id;

    Session.findByPk(id, {
        attributes: [
            "id",
            "id_curriculum",
            "index_session",
            "session_title",
            "session_content",
            "link_source",
            "link_video",
        ],
        include: [
            {
                model: Curriculum,
                as: "curriculum",
                attributes: ["id", "curriculum_title"],
            },
        ],
    })
        .then((session) => {
            if (!session) {
                return res.status(404).send({
                    message: "Session not found!",
                });
            }

            res.status(200).send(session);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Session.",
            });
        });
};

// Update Session by ID
exports.updateSession = (req, res) => {
    const id = req.params.id;
    const { id_curriculum, session_title, index_session, session_content, link_source, link_video } = req.body.data;

    if (!id_curriculum || !session_title) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Session.update(
        {
            id_curriculum: id_curriculum,
            session_title: session_title,
            index_session: index_session,
            session_content: session_content,
            link_source: link_source,
            link_video: link_video,
        },
        { where: { id: id } },
    )
        .then(([num]) => {
            if (num == 1) {
                res.status(200).send({
                    message: "Session was updated successfully.",
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Session with id=${id}. Maybe Session was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Error updating Session with id=" + id,
            });
        });
};

// Delete Session by ID
exports.deleteSession = (req, res) => {
    const id = req.params.id;

    Session.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    message: "Session was deleted successfully!",
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Session with id=${id}. Maybe Session was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Could not delete Session with id=" + id,
            });
        });
};