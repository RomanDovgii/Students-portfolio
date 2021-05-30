const Router = require('express');
const router = new Router();
const diplomaController = require('../Controllers/diplomaController');

router.post('/', diplomaController.create);
router.get('/', diplomaController.getAll);
router.get('/:id', diplomaController.get);


module.exports = router;