const {University} = require('../models/models');
const ApiError = require('../error/error');

class UniversityController {
    async create (req, res) {
        const {name, address} = req.body;
        const university = await University.create({name, address});
        return res.json(university);
    }

    async getAll (req, res) {
        const universities = await University.findAll();
        return res.json(universities);
    }

    async get (req, res) {
        const {id} = req.params;

        const university = await University.findOne({
            where: {
                id: id
            }
        });

        res.json(university);
    }
};

module.exports = new UniversityController();