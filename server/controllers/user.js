const {User, Participant} = require('../models/models');
const ApiError = require('../error/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {REGULAR_EXPRESSION_EMAIL} = require('../utils/const');

const generateJwt = (id, email, role) => {
    return jwt.sign({
        id,
        email,
        login,
        role
    },
    process.env.SECRET_KEY,
    {
        expiresIn: `24h`
    });
};

class UserController {
    async signup(req, res) {
        const {email, login, password, role} = req.body;
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await User.create({email, login, password: hashPassword, role: role || `user`});
            const token = generateJwt(user.id, user.email, user.login, user.role);
            return res.json(token);
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
                            email: email
                        }
                    });
                    break
                case login !== ``:
                    user = await User.findOne({
                        where: {
                            login: login
                        }
                    });                    
                    break;      
                default:
                    return next(ApiError.internal(`Ошибка в пароле`));
            }

            const isPasswordCorrect = bcrypt.compareSync(password, user.dataValues.password);
            if (!isPasswordCorrect) {
                return next(ApiError.internal(`Ошибка в пароле`));
            };

            const token = generateJwt(user.dataValues.id, user.dataValues.email, user.dataValues.login, user.dataValues.role);

            const id = user.dataValues.id;
            
            try {
                participant = await Participant.findOne({
                    where: {
                    userId: id,     
                    }
                });
            }
            catch {
                return next(ApiError.internal(`Участник не найден`));
            }
            
            res.json({...token, ...participant.dataValues});
        } else {
            return next(ApiError.internal(`Ошибка в пароле`));
        }
    }

    async check (req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.login, req.user.role);
        if(!id) {
            return next(ApiError.badRequest('Не задан id'));
        }

        return res.json({token});
    }
};

module.exports = new UserController();