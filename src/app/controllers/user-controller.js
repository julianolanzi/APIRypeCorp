
const userService = require('../services/users/users.service');
const ValidationContract = require('../validators/fluent-validador');
const emailService = require('../services/emails/email-service');

exports.get = async (req, res, next) => {
    try {
        const data = await userService.get();
        return res.status(200).send(data);

    } catch (error) {
        return res.status(401).send({ error: 'Sem Usuários' });
    }
}

exports.post = async (req, res, next) => {

    const { email, cpf } = req.body;

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 4, 'O nome requer pelo menos 8 caracteres');
    contract.hasMinLen(req.body.phone, 11, 'O telefone requer pelo menos 11 caracteres');
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha requer pelo menos 6 caracteres');


    const err = contract.errors();
    const errors = err.map(err => err.error);

    if (!contract.isValid()) {
        return res.status(400).send({ errors: errors }).end();
    }

    try {
        const isUser = await userService.getRegister(email, cpf);
        if (isUser == true) {
            return res.status(400).send({ error: 'Usuário já existe' });
        };


        const payload = req.body;
        const data = await userService.create(payload);

        // const message = emailService.registerMessage(payload);
        // emailService.sendEmail(message);

        res.status(201).send({ data, message: 'Cadastro com sucesso' });

    } catch (error) {
        return res.status(400).send({ error: 'Cadastro falhou' });
    }

}

exports.getById = async (req, res, next) => {
    try {
        var data = await userService.getByid(req.params.id);
        res.status(200).send(data);

    } catch (error) {
        res.status(400).send({ error: 'Usuário nao encontrado' });
    }
}

exports.put = async (req, res, next) => {

    try {
        const data = req.body;

        if (req.params.id.length < 24)
            return res.status(404).send({ error: 'Id incorreto' });

        const id = await userService.getByid(req.params.id);

        if (!id) {
            return res.status(401).send({ error: 'Usuário inválido' });
        };


        const user = await userService.updateUser(req.params.id, data);


        res.status(201).send({
            message: { user, message: 'Atualização realizada com sucesso' }
        });
    } catch (error) {
        res.status(404).send({ error: 'Autenticação falhou' });
    }
}

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await userService.getByid(id);

        if (!user) {
            return res.status(400).send({ error: 'Usuário nao encontrado' });
        }

        const data = await userService.deleteUser(id);

        return res.status(200).send({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(404).send({ error: 'Falha ao deleter usuário' });
    }
}