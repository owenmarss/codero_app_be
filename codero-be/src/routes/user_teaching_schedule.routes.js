const express = require('express');
const router = express.Router();
const user_teaching_schedule = require('../controllers/user_teaching_schedule.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js');
const checkPosisi = require('../middlewares/role.middleware.js');


// ? Many-to-Many relationship routes
router.post('/assign', authMiddleware, user_teaching_schedule.assignScheduleToUsers);

// ? Get all schedules
router.get('/all-schedules', authMiddleware, user_teaching_schedule.getAllSchedules);

// ? Get all assigned schedules
router.get('/assigned-schedules', authMiddleware, user_teaching_schedule.getAllAssignedSchedules); 

// ? Get all schedules by user
router.get('/by-user/:id', authMiddleware, user_teaching_schedule.findByUser);

// ? Get all users by schedule
router.get('/by-schedule/:id', authMiddleware, user_teaching_schedule.findBySchedule);

// ? Update schedules for User
router.put('/update-schedules', authMiddleware, user_teaching_schedule.updateSchedulesForUser);

// ? Update users for Schedule
router.put('/update-users', authMiddleware, user_teaching_schedule.updateUsersForSchedule);

// ? Delete schedules for User
router.delete('/delete-schedules', authMiddleware, user_teaching_schedule.deleteSchedulesForUser);

// ? Delete users for Schedule
router.delete('/delete-users', authMiddleware, user_teaching_schedule.deleteUsersForSchedule);

// ? One-to-Many relationship routes
// router.get('/by-user', authMiddleware, user_schedule.findByUser);
// router.get('/by-schedule', authMiddleware, user_schedule.findBySchedule);
// router.get('/by-user-schedule', authMiddleware, user_schedule.findOneByUserAndSchedule);

// router.post('/', authMiddleware, user_schedule.create);
// router.get('/', authMiddleware, user_schedule.findAll);
// router.get('/:id', authMiddleware, user_schedule.findOne);

// router.put('/:id', authMiddleware, user_schedule.update);
// router.delete('/:id', authMiddleware, user_schedule.delete);
// router.delete('/', authMiddleware, user_schedule.deleteAll);

module.exports = router;