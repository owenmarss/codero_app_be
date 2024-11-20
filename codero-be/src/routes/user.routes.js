const express = require('express')
const router = express.Router()
const users = require('../controllers/user.controller.js')
// const authMiddleware = require('../middlewares/auth.middleware.js')
// const checkRole = require('../middlewares/role.middleware.js');

// Public Routes    
router.post('/login', users.login);

// Private Routes
router.post('/', users.create);
router.get('/', users.findAll);
router.get('/:id', users.findOne);

// Check Token
router.get('/check_token/:accessToken', users.checkToken);
router.put('/:id/details', users.updateUserDetails);
router.put('/:id/password', users.updatePassword);
router.delete('/:id', users.delete);
router.delete('/', users.deleteAll);

router.post('/register', users.register);

module.exports = router;