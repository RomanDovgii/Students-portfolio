const {Participant} = require('../models/models');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const ApiError = require('../error/error');

class ParticipantController {
    async create(req, res, next) {
        try {
            const {avatar} = req.files;
            let fileName = uuid.v4() + ".jpg";

            const participant = {...req.body};
            await Participant.findOrCreate({
                where: {
                    userId: participant.userId
                },
                defaults: {
                    ...participant,
                    avatar: fileName
                }
            }).then((result) => {
                const isCreated = result[1];

                if (!isCreated) {
                    return res.json({"message": "user already exists"});
                }
                
                avatar.mv(path.resolve(__dirname, '..', 'static', fileName))
                return res.json(participant)
            });
            
            
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
        
    }

    async update (req, res) {}

    async get (req, res, next) {
    }

    async getAll(req, res, next) {
        const participant = await Participant.findAll();
        return res.json(participant);
    }
};

module.exports = new ParticipantController();