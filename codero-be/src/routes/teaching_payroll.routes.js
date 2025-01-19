const express = require('express');
const router = express.Router();
const teaching_payroll = require('../controllers/teaching_payroll.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js');
const checkPosisi = require('../middlewares/role.middleware.js');

router.get('/', authMiddleware, teaching_payroll.getAllTeachingPayroll);
router.get('/:id', authMiddleware, teaching_payroll.getTeachingPayrollById);
router.get('/user/:userId', authMiddleware, teaching_payroll.getTeachingPayrollByUserId);
router.post('/', authMiddleware, teaching_payroll.createTeachingPayroll);
router.put('/:id', authMiddleware, teaching_payroll.updatePaymentById);
router.delete('/', authMiddleware, teaching_payroll.deleteAllTeachingPayroll);
router.delete('/:id', authMiddleware, teaching_payroll.deleteTeachingPayrollById);

module.exports = router;