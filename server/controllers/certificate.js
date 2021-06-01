const {Certificate, Participant_certificate} = require('../models/models');
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
        const certificates = await Certificate.findAll();
        return res.json('certificates');
    }

    async get (req, res) {}
};

module.exports = new CertificateController();