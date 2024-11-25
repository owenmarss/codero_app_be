const express = require('express');
const router = express.Router();
const attendance = require('../controllers/attendance.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js');
const checkPosisi = require('../middlewares/role.middleware.js');

router.get('/', authMiddleware, attendance.getAllAttendance);
router.get('/:id', authMiddleware, attendance.getAttendanceById);
router.get('/user/:userId', authMiddleware, attendance.getAttendanceByUserId);
router.get('/schedule/:scheduleId', authMiddleware, attendance.getAttendanceByScheduleId);
router.post('/', authMiddleware, attendance.createAttendance);
router.put('/:id/arrive', authMiddleware, attendance.updateArrivalTime);
router.put('/:id/depart', authMiddleware, attendance.updateDepartureTime);

module.exports = router;