const express = require('express');
const router = express.Router();
const session = require('../controllers/session.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js')
const checkPosisi = require('../middlewares/role.middleware.js');

// Create a new Pertemuan
router.post('/', authMiddleware, session.createSession);
router.get('/materi/:id', authMiddleware, session.getAllSessionByCurriculumId);
router.get('/', authMiddleware, session.getAllSession);
router.get('/:id', authMiddleware, session.getSessionById);
router.put('/:id', authMiddleware, session.updateSession);
router.delete('/:id', authMiddleware, session.deleteSession);

module.exports = router;