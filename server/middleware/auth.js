const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({message: `Не авторизован`});
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch {
        res.status(401).json({
            message: `Не авторизован`
        });
    }
}