const {Event, Participant_event} = require('../models/models');
const ApiError = require('../error/error');

class EventController {
    async create (req, res) {
        const {name, place, role, for_what, organization, participantId} = req.body;
        const event = {
            name, place, role, for_what, organization
        }; 
        const createdEvent = await Event.create(event);

        await Participant_event.create({
            participantId,
            eventId: createdEvent.id
        });
        return res.json(event);
    }

    async getAll (req, res, next) {
        const events = await Event.findAll();
        return res.json('events');
    }

    async get (req, res) {
        const {id} = req.params;

        const event = await Event.findOne({
            where: {
                id: id
            }
        });

        res.json(event);
    }
};

module.exports = new EventController();