const express = require('express');
const router = express.Router();
const materi = require('../controllers/materi.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js')
const checkPosisi = require('../middlewares/role.middleware.js');

// Create a new Materi
router.post('/', authMiddleware, materi.createMateri);
router.get('/', authMiddleware, materi.getAllMateri);
router.get('/coding', authMiddleware, materi.getAllMateriCoding);
router.get('/robotic', authMiddleware, materi.getAllMateriRobotic);
router.get('/:id', authMiddleware, materi.getMateriById);
router.put('/:id', authMiddleware, materi.updateMateri);
router.delete('/:id', authMiddleware, materi.deleteMateri);

module.exports = router;