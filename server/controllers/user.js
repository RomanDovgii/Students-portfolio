const {User} = require('../models/models');
const ApiError = require('../error/error');

class UserController {
    async registration(req, res) {
        const {email, login, password, role} = req.body;
        const user = await User.create({email, login, password, role});
        return res.json(user);
    }

    async login (req, res) {}

    async check (req, res, next) {
        const {id} = req.query;
        if(!id) {
            return next(ApiError.badRequest('Не задан id'));
        }
    }
};

module.exports = new UserController();