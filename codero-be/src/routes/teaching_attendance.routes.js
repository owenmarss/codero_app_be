const express = require('express');
const router = express.Router();
const teaching_attendance = require('../controllers/teaching_attendance.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js');
const checkPosisi = require('../middlewares/role.middleware.js');

router.get('/', authMiddleware, teaching_attendance.getAllAttendance);
router.get('/:id', authMiddleware, teaching_attendance.getAttendanceById);
router.get('/user/:userId', authMiddleware, teaching_attendance.getAttendanceByUserId);
router.get('/schedule/:scheduleId', authMiddleware, teaching_attendance.getAttendanceByScheduleId);
router.post('/', authMiddleware, teaching_attendance.createAttendance);
router.put('/:id/arrive', authMiddleware, teaching_attendance.updateArrivalTime);
router.put('/:id/depart', authMiddleware, teaching_attendance.updateDepartureTime);

module.exports = router;