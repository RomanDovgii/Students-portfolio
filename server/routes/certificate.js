const Router = require('express');
const router = new Router();
const certificateController = require('../controllers/certificate');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, certificateController.create);
router.get('/', certificateController.getAll);
router.get('/:id', certificateController.get);


module.exports = router;
