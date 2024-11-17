const express = require('express');
const router = express.Router();
const user_schedule = require('../controllers/user_schedule.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js');
const checkPosisi = require('../middlewares/role.middleware.js');

router.get('/by-user', authMiddleware, user_schedule.findByUser);
router.get('/by-schedule', authMiddleware, user_schedule.findBySchedule);
router.get('/by-user-schedule', authMiddleware, user_schedule.findOneByUserAndSchedule);

router.post('/', authMiddleware, user_schedule.create);
router.get('/', authMiddleware, user_schedule.findAll);
router.get('/:id', authMiddleware, user_schedule.findOne);

router.put('/:id', authMiddleware, user_schedule.update);
router.delete('/:id', authMiddleware, user_schedule.delete);
router.delete('/', authMiddleware, user_schedule.deleteAll);

module.exports = router;