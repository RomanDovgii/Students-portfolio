const Router = require('express');
const router = new Router();
const eventController = require('../Controllers/eventController');

router.post('/', eventController.create);
router.get('/', eventController.getAll);
router.get('/:id', eventController.get);


module.exports = router;