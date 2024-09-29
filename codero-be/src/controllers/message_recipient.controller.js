const db = require('../models');
const MessageRecipient = db.message_recipient;

// Mark a message as read
exports.markAsRead = (req, res) => {
    const { messageId, userId } = req.params;

    if (!messageId || !userId) {
        return res.status(400).send({ message: 'Message ID or User ID is missing!' });
    }

    MessageRecipient.findOne({
        where: {
            id_message: messageId,
            id_penerima: userId,
        }
    })
    .then(recipient => {
        if(!recipient) {
            return res.status(404).send({ message: 'Recipient not found for this message!' });
        }

        return MessageRecipient.updat({ status: 'Dibaca' })
        .then(() => {
            res.status(200).send({ message: 'Message has been marked as read!' });
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while marking the message as read.',
        });
    });
}