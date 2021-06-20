const Router = require('express');
const router = new Router();
const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/auth', userController.check);

module.exports = router;