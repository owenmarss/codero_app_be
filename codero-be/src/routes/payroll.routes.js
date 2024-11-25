const express = require('express');
const router = express.Router();
const payroll = require('../controllers/payroll.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js');
const checkPosisi = require('../middlewares/role.middleware.js');

router.get('/', authMiddleware, payroll.getAllPayroll);
router.get('/:id', authMiddleware, payroll.getPayrollById);
router.get('/user/:userId', authMiddleware, payroll.getPayrollByUserId);
router.post('/', authMiddleware, payroll.createPayroll);
router.put('/:id', authMiddleware, payroll.updatePaymentById);
router.delete('/', authMiddleware, payroll.deleteAllPayroll);
router.delete('/:id', authMiddleware, payroll.deletePayrollById);

module.exports = router;