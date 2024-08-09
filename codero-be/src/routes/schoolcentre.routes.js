const express = require('express')
const router = express.Router()
const schoolCentres = require('../controllers/schoolcentre.controller.js')

const authMiddleware = require('../middlewares/auth.middleware.js')
const checkPosisi = require('../middlewares/role.middleware.js');

router.post('/', [authMiddleware, checkPosisi(['Head', 'Business Development'])], schoolCentres.create);
router.get('/', authMiddleware, schoolCentres.findAll);
router.get('/:id', authMiddleware, schoolCentres.findOne);
router.put('/:id', authMiddleware, schoolCentres.update);
router.delete('/:id', authMiddleware, schoolCentres.delete);
router.delete('/', authMiddleware, schoolCentres.deleteAll);

module.exports = router;