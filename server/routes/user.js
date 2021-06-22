const Router = require('express');
const router = new Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);

module.exports = router;