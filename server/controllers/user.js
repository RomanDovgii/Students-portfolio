const {User, Participant} = require('../models/models');
const ApiError = require('../error/error');
const {REGULAR_EXPRESSION_EMAIL} = require('../utils/const');


class UserController {
    async signup(req, res) {
        const {email, login, password, role} = req.body;
        try {
        const user = await User.create({email, login, password, role});
        return res.json(user);
        }
        catch (err) {
            const errorText = err.errors[0].message;
            return res.json(errorText);
        }
    }

    async login (req, res) {
        const {email, login, password} = req.body;
        if (password) {
            let user;
            let participant;

            switch (true) {
                case email !== ``:
                    user = await User.findOne({
                        where: {
                            email: email,
                            password: password
                        }
                    });
                    break
                case login !== ``:
                    user = await User.findOne({
                        where: {
                            login: login,
                            password: password
                        }
                    });                    
                    break;      
                default:
                    user = {
                        error: `Не указан логин или пароль`
                    };
                    break;
            }

            const id = user.dataValues.id;
            

            try {
                participant = await Participant.findOne({
                    where: {
                    userId: id,     
                    }
                });
            }
            catch {
                participant = {
                    error: `Участник не найден`
                };
            }
            
            res.json({...user.dataValues, ...participant.dataValues});

        } else {
            res.json(`No password`);
        }
    }

    async check (req, res, next) {
        const {id} = req.query;
        if(!id) {
            return next(ApiError.badRequest('Не задан id'));
        }
    }
};

module.exports = new UserController();