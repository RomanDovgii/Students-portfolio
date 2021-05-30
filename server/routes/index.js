const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const universityRouter = require('./universityRouter');
const diplomaRouter = require('./diplomaRouter');
const eventRouter = require('./eventRouter');
const certificateRouter = require('./certificateRouter');


router.use('/user', userRouter);
router.use('/universities', universityRouter);
router.use('/diplomas', diplomaRouter);
router.use('/events', eventRouter);
router.use('/certificates', certificateRouter);

module.exports = router;