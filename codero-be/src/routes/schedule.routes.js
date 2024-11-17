const express = require('express');
const router = express.Router();
const schedule = require('../controllers/schedule.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js');
const checkPosisi = require('../middlewares/role.middleware.js');

router.post('/', authMiddleware, schedule.create);
router.get('/', authMiddleware, schedule.findAll);
router.get('/:id', authMiddleware, schedule.findOne);
router.put('/:id', authMiddleware, schedule.update);
router.delete('/:id', authMiddleware, schedule.delete);
router.delete('/', authMiddleware, schedule.deleteAll);

module.exports = router;