
const userService = require('../services/users/users.service');
const ValidationContract = require('../validators/fluent-validador');
const emailService = require('../services/emails/email-service');

exports.get = async (req, res, next) => {
    try {
        const data = await userService.get();
        return res.status(200).send(data);

    } catch (error) {
        return res.status(401).send({ error: 'no registered users' });
    }
}

exports.post = async (req, res, next) => {

    const { email, cpf } = req.body;

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 4, 'Name requires at least 8 characters');
    contract.hasMinLen(req.body.cpf, 11, 'CPF requires at least 11 characters');
    contract.isEmail(req.body.email, 'Invalid email');
    contract.hasMinLen(req.body.password, 6, 'Password requires at least 6 characters');


    const err = contract.errors();
    const errors = err.map(err => err.error);

    if (!contract.isValid()) {
        return res.status(400).send({ errors: errors }).end();
    }

    try {
        const isUser = await userService.getRegister(email, cpf);
        if (isUser == true) {
            return res.status(400).send({ error: 'User already exists' });
        };


        const payload = req.body;
        const data = await userService.create(payload);

        // const message = emailService.registerMessage(payload);
        // emailService.sendEmail(message);

        res.status(201).send({ data, message: 'registration successful' });

    } catch (error) {
        return res.status(400).send({ error: 'registration failed' });
    }

}

exports.getById = async (req, res, next) => {
    try {
        var data = await userService.getByid(req.params.id);
        res.status(200).send(data);

    } catch (error) {
        res.status(400).send({ error: 'no registered user' });
    }
}

exports.put = async (req, res, next) => {

    try {
        const data = req.body;

        if (req.params.id.length < 24)
            return res.status(404).send({ error: 'íd incorrect' });

        const id = await userService.getByid(req.params.id);

        if (!id) {
            return res.status(401).send({ error: 'User invalid' });
        };


        const user = await userService.updateUser(req.params.id, data);


        res.status(201).send({
            message: { user, message: 'Update sucess' }
        });
    } catch (error) {
        res.status(404).send({ error: 'Auth failed' });
    }
}

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await userService.getByid(id);

        if (!user) {
            return res.status(400).send({ error: 'user not found' });
        }

        const data = await userService.deleteUser(id);

        return res.status(200).send({ message: 'User deleted sucess' });
    } catch (error) {
        res.status(404).send({ error: 'User not deleted' });
    }
}