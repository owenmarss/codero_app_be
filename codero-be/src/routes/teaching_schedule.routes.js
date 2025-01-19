const express = require('express');
const router = express.Router();
const teaching_schedule = require('../controllers/teaching_schedule.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js');
const checkPosisi = require('../middlewares/role.middleware.js');

router.post('/', authMiddleware, teaching_schedule.create);
router.get('/', authMiddleware, teaching_schedule.findAll);
router.get('/:id', authMiddleware, teaching_schedule.findOne);
router.put('/:id', authMiddleware, teaching_schedule.update);
router.delete('/:id', authMiddleware, teaching_schedule.delete);
router.delete('/', authMiddleware, teaching_schedule.deleteAll);

module.exports = router;