const Router = require('express');
const router = new Router();
const universityController = require('../controllers/university');
const checkRole = require('../middleware/checkRole');

router.post('/', checkRole('ADMIN'), universityController.create);
router.get('/', universityController.getAll);
router.get('/:id', universityController.get);


module.exports = router;
