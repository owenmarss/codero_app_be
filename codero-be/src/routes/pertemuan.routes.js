const express = require('express');
const router = express.Router();
const pertemuan = require('../controllers/pertemuan.controller.js');

const authMiddleware = require('../middlewares/auth.middleware.js')
const checkPosisi = require('../middlewares/role.middleware.js');

// Create a new Pertemuan
router.post('/', authMiddleware, pertemuan.createPertemuan);
router.get('/materi/:id', authMiddleware, pertemuan.getAllPertemuanByMateriId);
router.get('/', authMiddleware, pertemuan.getAllPertemuan);
router.get('/:id', authMiddleware, pertemuan.getPertemuanById);
router.put('/:id', authMiddleware, pertemuan.updatePertemuan);
router.delete('/:id', authMiddleware, pertemuan.deletePertemuan);

module.exports = router;