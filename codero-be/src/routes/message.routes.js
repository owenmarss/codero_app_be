const express = require('express');
const router = express.Router();
const messages = require('../controllers/message.controller.js');
const messageRecipients = require('../controllers/message_recipient.controller.js');

router.post('/', messages.sendMessage);
router.get('/user/:id', messages.getAllMessages);
router.get('/:id', messages.getMessageById);
router.get('/unread', messages.getUnreadMessages);
router.get('/read', messages.getReadMessages);
router.delete('/', messages.deleteAllMessages);
router.delete('/:id', messages.deleteMessage);
// router.put('/:messageId/read/:userId', messageRecipients.markAsRead);

module.exports = router;