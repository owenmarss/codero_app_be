const express = require('express');
const router = express.Router();
const curriculum = require('../controllers/curriculum.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js')
const checkPosisi = require('../middlewares/role.middleware.js');

// Create a new Materi
router.post('/', authMiddleware, curriculum.createCurriculum);
router.get('/', authMiddleware, curriculum.getAllCurriculum);
router.get('/filter', authMiddleware, curriculum.getAllCurriculumLimit);
router.get('/coding', authMiddleware, curriculum.getAllCurriculumCoding);
router.get('/robotic', authMiddleware, curriculum.getAllCurriculumRobotic);
router.get('/:id', authMiddleware, curriculum.getCurriculumById);
router.put('/:id', authMiddleware, curriculum.updateCurriculum);
router.delete('/:id', authMiddleware, curriculum.deleteCurriculum);

module.exports = router;