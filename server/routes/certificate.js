const Router = require('express');
const router = new Router();
const certificateController = require('../controllers/certificate');

router.post('/', certificateController.create);
router.get('/', certificateController.getAll);
router.get('/:id', certificateController.get);


module.exports = router;