const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')
const verifyToken = require('../middleware/auth')

router.post('/register', UserController.create)
router.post('/login', UserController.check)
router.get('/', verifyToken, UserController.isLogin)

module.exports = router;