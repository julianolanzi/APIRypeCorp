const jwt = require('jsonwebtoken');
const configs = require('../config/configs');

const teamService = require('../services/teams/teams.service');


exports.generateToken = (params = {}) => {
    const token = jwt.sign(params, configs.SECRET, {
        expiresIn: 86400,
    })
    return token;
};

exports.verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token Error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformatted' });
    }

    jwt.verify(token, configs.SECRET, (err, decoded) => {
        if (err)
            return res.status(401).send({ error: 'Token invalid' });

        req.userId = decoded.id;

        return next();
    })
};

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, process.env.SECRET);
    return data;
}



exports.isAdmin = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token Error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformatted' });
    }

    jwt.verify(token, configs.SECRET, (err, decoded) => {
        if (err)
            return res.status(401).send({ error: 'Token invalid' });

        const data = jwt.decode(token);
        let isAdmin = data.user.roles;
        if (isAdmin == 'admin') {
            return next();
        } else {
            return res.status(403).json({
                message: 'Essa ação só pode ser feita por um admin'
            });
        }


    })
};

exports.isAdminTeam = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token Error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformatted' });
    }

    jwt.verify(token, configs.SECRET, async (err, decoded) => {
        if (err)
            return res.status(401).send({ error: 'Token invalid' });

        const user = decoded;
       
        if (user.roles == 'admin') {
            req.userId = decoded.id;
            return next();
        }
        const data = jwt.decode(token);

        const id = decoded.id
        const permission = await teamService.findUserTeam(id);
        if (permission.role == 'admin') {
            return next();
        }

        if (permission.role == 'sub-admin') {
            return next();
        } else {
            return res.status(403).json({
                error: 'Voce precisa ser admin do time para realizar mudanças'
            });
        }


    })

};
