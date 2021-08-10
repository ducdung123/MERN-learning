const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const verifyToken = require('../middleware/auth')

router.get('/', verifyToken, PostController.find)
router.post('/', verifyToken, PostController.create)
router.put('/:id', verifyToken, PostController.update)
router.delete('/:id', verifyToken, PostController.delete)

module.exports = router;