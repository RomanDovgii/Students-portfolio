const Router = require('express');
const router = new Router();
const participantController = require('../controllers/participant');
const authMiddleware = require('../middleware/auth');

router.post('/create', authMiddleware, participantController.create);
router.post('/update', authMiddleware, participantController.update);
router.get('/:id', participantController.get);
router.get('/participant', participantController.getAll);

module.exports = router;
