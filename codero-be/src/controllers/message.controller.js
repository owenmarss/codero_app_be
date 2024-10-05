// const { where } = require('sequelize');
const db = require("../models");
const Message = db.message;
const MessageRecipient = db.messageRecipient;
const User = db.user;
const { verifyToken } = require("../utils/jwt.utils");


// Create and Save a new Message
exports.sendMessage = (req, res) => {
    const { id_pengirim, subject, isi_pesan, recipients } = req.body.data;
    console.log(req.body.data);

    // Validate request
    if (!id_pengirim || !subject || !isi_pesan || !recipients) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a Message
    Message.create({
        id_pengirim: id_pengirim,
        subject: subject,
        isi_pesan: isi_pesan,
        tanggal_dikirim: new Date().toISOString().split("T")[0],
        waktu_dikirim: new Date().toTimeString().split(" ")[0],
    })
        .then((message) => {
            const messageRecipients = recipients.map((recipient) => {
                return {
                    id_message: message.id,
                    id_penerima: recipient,
                    status: "Belum Dibaca",
                };
            });
            return MessageRecipient.bulkCreate(messageRecipients);
        })
        .then(() => {
            res.status(201).send({ message: "Message was sent successfully!" });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while sending the message.",
            });
        });
};

// Get all messages for a User
exports.getAllMessages = (req, res) => {
    const user_id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    // Calculate the offset
    const offset = (page - 1) * limit;

    MessageRecipient.findAndCountAll({
        where: { id_penerima: user_id },
        include: {
            model: Message,
            include: {
                model: User,
                as: "pengirim",
                attributes: ["namaDepan", "namaBelakang", "email"],
            },
        },
        limit: limit,
        offset: offset
    })
        .then((result) => {
            const totalMessages = result.count;
            const totalPages = Math.ceil(totalMessages / limit);

            res.status(200).send({
                totalMessages: totalMessages,
                totalPages: totalPages,
                currentPage: page,
                messages: result.rows
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving messages.",
            });
        });
};

// Get a single message with an id
exports.getMessageById = (req, res) => {
    const message_id = req.params.id;

    MessageRecipient.update(
        { status: "Dibaca" },
        {
            where: {
                id_message: message_id,
            },
        }
    ).then(() => {
        Message.findByPk(message_id, {
            include: [
                {
                    model: User,
                    as: "pengirim",
                    attributes: ["namaDepan", "namaBelakang", "email"],
                },
                {
                    model: MessageRecipient,
                    include: [
                        {
                            model: User,
                            as: "penerima",
                            attributes: ["namaDepan", "namaBelakang", "email"],
                        },
                    ],
                },
            ],
        })
            .then((message) => {
                res.status(200).send(message);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while retrieving message.",
                });
            });
    });
};

// Get all unread messages for a User
exports.getUnreadMessages = (req, res) => {
    // Get user token
    let token = req.headers["authorization"];
    token = token.split(" ")[1];
    console.log(token);
    // Get user id from token
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    const user_id = decoded.id;
    
    console.log(user_id);

    MessageRecipient.findAll({
        where: { id_penerima: user_id, status: "Belum Dibaca" },
        include: {
            model: Message,
            include: {
                model: User,
                as: "pengirim",
                attributes: ["namaDepan", "namaBelakang", "email"],
            },
        },
    }).then((messages) => {
        res.status(200).send(messages);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving messages.",
        });
    });
};

// Get all read messages for a User
exports.getReadMessages = (req, res) => {
    const user_id = req.params.id;

    MessageRecipient.findAll({
        where: { id_penerima: user_id, status: "Dibaca" },
        include: {
            model: Message,
            include: {
                model: User,
                as: "pengirim",
                attributes: ["namaDepan", "namaBelakang", "email"],
            },
        },
    })
        .then((messages) => {
            res.status(200).send(messages);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving messages.",
            });
        });
};

// Delete all messages for a User
exports.deleteAllMessages = (req, res) => {
    const user_id = req.params.id;

    MessageRecipient.destroy({
        where: { id_penerima: user_id },
    })
        .then(() => {
            res.status(200).send({
                message: "Messages were deleted successfully!",
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while deleting the messages.",
            });
        });
};

// Delete a message with the specified id
exports.deleteMessage = (req, res) => {
    const message_id = req.params.id;

    Message.destroy({
        where: { id: message_id },
    })
        .then(() => {
            res.status(200).send({
                message: "Message was deleted successfully!",
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while deleting the message.",
            });
        });
};
