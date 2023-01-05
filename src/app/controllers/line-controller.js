const lineService = require('../services/teams/line.service');

exports.get = async (req, res, next) => {
    try {
        const data = await lineService.get();
        
        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send({ error: 'Erro na chamada' });
    }
}

exports.post = async (req, res, next) => {
    try {
        const data = req.body;

        const line = await lineService.create(data);

        return res.status(200).send({line, message: 'Line cadastrada com sucesso'});
    } catch (error) {
        return res.status(400).send({ error: 'Erro na chamada' });
    }
}

