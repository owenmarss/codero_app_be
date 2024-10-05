const express = require('express')
const router = express.Router()
const students = require('../controllers/student.controller.js')

const authMiddleware = require('../middlewares/auth.middleware.js')
const checkPosisi = require('../middlewares/role.middleware.js');

router.post('/', [authMiddleware, checkPosisi(['Head', 'Business Development'])], students.create);
router.get('/', authMiddleware, students.findAll);
router.get('/:id', authMiddleware, students.findOne);
router.put('/:id', authMiddleware, students.update);
router.delete('/:id', authMiddleware, students.delete);
router.delete('/', authMiddleware, students.deleteAll);

module.exports = router;