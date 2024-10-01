const express = require('express');
const router = express.Router();
const messages = require('../controllers/message.controller.js');
const messageRecipients = require('../controllers/message_recipient.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js')
const checkPosisi = require('../middlewares/role.middleware.js');

router.post('/', authMiddleware, messages.sendMessage);
router.get('/user/:id', authMiddleware, messages.getAllMessages);
router.get('/:id', authMiddleware, messages.getMessageById);
router.get('/unread', authMiddleware, messages.getUnreadMessages);
router.get('/read', authMiddleware, messages.getReadMessages);
router.delete('/', authMiddleware, messages.deleteAllMessages);
router.delete('/:id', authMiddleware, messages.deleteMessage);
// router.put('/:messageId/read/:userId', messageRecipients.markAsRead);

module.exports = router;