const express = require('express');
const router = express.Router();
const presensi = require('../controllers/presensi.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js');
const checkPosisi = require('../middlewares/role.middleware.js');

router.get('/', authMiddleware, presensi.getAllPresensi);
router.get('/:id', authMiddleware, presensi.getPresensiById);
router.get('/user/:userId', authMiddleware, presensi.getPresensiByUserId);
router.get('/schedule/:scheduleId', authMiddleware, presensi.getPresensiByScheduleId);
router.post('/', authMiddleware, presensi.createPresensi);
router.put('/:id/datang', authMiddleware, presensi.updateJamDatang);
router.put('/:id/pulang', authMiddleware, presensi.updateJamPulang);

module.exports = router;