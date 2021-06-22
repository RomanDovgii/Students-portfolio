const {Diploma, Participant_diploma, Participant} = require('../models/models');
const ApiError = require('../error/error');

class DiplomaController {
    async create (req, res) {
        const {name, place, role, for_what, organization, participantId} = req.body;
        const diploma = {
            name, place, role, for_what, organization
        };
        const newDiploma = await Diploma.create({...diploma});
        await Participant.findByPk(participantId).then(participant => {
            Diploma.findByPk(newDiploma.id)
                .then(diploma => {
                    participant.addDiploma(diploma);
                    res.json('200');
                })
        });
    }

    async getAll (req, res, next) {
        const {participantId, limit, page} = req.body;
        let diplomas;

        // const currentPage = page || 1;
        // const currentLimit = limit || 10;

        switch (true) {
            case participantId > 0:
                const participant = await Participant.findByPk(participantId);
                diplomas = await participant.getDiplomas();
                return res.json(diplomas);

            default:
                diplomas = await Diploma.findAll();
                return res.json(diplomas);
                break;
        }
    }

    async get (req, res) {
        const {id} = req.params;

        const diploma = await Diploma.findOne({
            where: {
                id: id
            }
        });

        res.json(diploma);
    }
};

module.exports = new DiplomaController();