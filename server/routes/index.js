const Router = require('express');
const router = new Router();

const userRouter = require('./user');
const participantRouter = require('./participant');
const universityRouter = require('./university');
const diplomaRouter = require('./diploma');
const eventRouter = require('./event');
const certificateRouter = require('./certificate');


router.use('/user', userRouter);
router.use('/participant', participantRouter);
router.use('/universities', universityRouter);
router.use('/diplomas', diplomaRouter);
router.use('/events', eventRouter);
router.use('/certificates', certificateRouter);

module.exports = router;