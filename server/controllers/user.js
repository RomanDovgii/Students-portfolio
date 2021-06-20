const {User} = require('../models/models');
const ApiError = require('../error/error');

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
            console.log(email)
            switch (true) {
                case email !== ``:
                    user = await User.findOne({
                        where: {
                            email: email,
                            password: password
                        }
                    });
                    return res.json(user);
                case login !== ``:
                    user = await User.findOne({
                        where: {
                            login: login,
                            password: password
                        }
                    });
                    return res.json(user);      
                default:
                    return res.json(`Не указан логин или пароль`);
            }
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