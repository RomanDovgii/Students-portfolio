const Router = require('express');
const router = new Router();
const universityController = require('../Controllers/universityController');

router.post('/', universityController.create);
router.get('/', universityController.getAll);
router.get('/:id', universityController.get);


module.exports = router;