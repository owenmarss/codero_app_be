const express = require('express')
const router = express.Router()
const tax = require('../controllers/tax.controller.js')

router.post('/', tax.create);
router.get('/', tax.findAll);
router.get('/:id', tax.findOne);
router.put('/:id', tax.update);
router.delete('/:id', tax.delete);

module.exports = router;