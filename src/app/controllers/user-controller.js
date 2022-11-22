
const userService = require('../services/users/users.service');
const ValidationContract = require("../validators/fluent-validador");


exports.get = async (req, res, next) => {
    return res.status(200).send({ status: 'OK' });
}

exports.post = async (req, res, next) => {

    const { email, cpf } = req.body;

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 4, "O nome requer pelo menos 8 caracteres");
    contract.hasMinLen(req.body.cpf, 11, "O cpf requer pelo menos 11 caracteres");
    contract.isEmail(req.body.email, "Email inválido");
    contract.hasMinLen(req.body.password, 6, "A senha requerer no minimo 6 characters");


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
        res.status(201).send({ data, message: 'registration successful' });

    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'registration failed' });
    }

}