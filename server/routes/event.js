const Router = require('express');
const router = new Router();
const eventController = require('../controllers/event');
const checkRole = require('../middleware/checkRole');

router.post('/', checkRole('ADMIN'), eventController.create);
router.get('/', eventController.getAll);
router.get('/:id', eventController.get);


module.exports = router;