const express = require('express')
const router = express.Router()
const partner = require('../controllers/partner.controller.js')

const authMiddleware = require('../middlewares/auth.middleware.js')
const checkPosisi = require('../middlewares/role.middleware.js');

router.post('/', [authMiddleware, checkPosisi(['Head', 'Business Development'])], partner.create);
router.get('/', authMiddleware, partner.findAll);
router.get('/:id', authMiddleware, partner.findOne);
router.put('/:id', authMiddleware, partner.update);
router.delete('/:id', authMiddleware, partner.delete);
router.delete('/', authMiddleware, partner.deleteAll);

module.exports = router;