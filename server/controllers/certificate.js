const {Certificate, Participant_certificate, Participant} = require('../models/models');
const ApiError = require('../error/error');

class CertificateController {
    async create (req, res) {
        const {name, place, role, for_what, organization, participantId} = req.body;
        const certificate = {
            name, place, role, for_what, organization
        }; 
        const createdCertificate = await Certificate.create(certificate);

        await Participant_certificate.create({
            participantId,
            certificateId: createdCertificate.id
        });
        return res.json(certificate);
    }

    async getAll (req, res, next) {
        const {participantId, limit, page} = req.body;
        let certificates;

        // const currentPage = page || 1;
        // const currentLimit = limit || 10;

        switch (true) {
            case participantId > 0:
                const participant = await Participant.findByPk(participantId);
                certificates = await participant.getCertificates();
                return res.json(certificates);

            default:
                certificates = await Certificate.findAll();
                return res.json(certificates);
                break;
        }
    }

    async get (req, res) {
        const {id} = req.params;

        const certificate = await Certificate.findOne({
            where: {
                id: id
            }
        });

        res.json(certificate);
    }
};

module.exports = new CertificateController();
