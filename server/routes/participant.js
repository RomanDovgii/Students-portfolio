const Router = require('express');
const router = new Router();
const participantController = require('../controllers/participant');

router.post('/create', participantController.create);
router.post('/update', participantController.update);
router.get('/', participantController.get);
router.get('/users', participantController.getAll);

module.exports = router;