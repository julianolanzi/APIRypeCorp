
const userService = require('../services/auth/auth.service');
const authMidleware = require('../middlewares/auth');
const bcrypt = require('bcryptjs/dist/bcrypt');
const crypto = require('crypto');
const dotenv = require('dotenv');



exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {

        const user = await userService.login(email);

        var errors1 = 'Usuário nao encontrado';
        var errors2 = 'Senha inválida';

        if (!user)
            return res.status(400).send({ error: errors1 });

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: errors2 });

        user.password = undefined;

        res.status(200).send({
            user: {
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                url: user.url,
                team: user.team,
            },
            token: authMidleware.generateToken({ user, id: user.id })
        })
    } catch (error) {
        res.status(400).send({ message: 'Login falhou' })
    }
}

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {

        const user = await userService.forgotPass({ email });

        if (!user)
            return res.status(400).send({ error: 'Usuário nao encontrado' });

        const token = crypto.randomBytes(40).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        const data = await userService.forgotPassword(user.id, token, now);

        const url = `${process.env.APP_URL}/reset-password/${token}`;

        const crypt = authMidleware.generateToken({ email, token })

        // const message = emailService.forgotPassword(user, url);
        // console.log(message);
        // emailService.sendEmail(message);

        return res.status(200).send({ url, crypt, message: 'Senha alterada com sucesso' });

    } catch (error) {
        res.status(400).send({ error: 'Erro ao trocar a senha tente novamente' })
    }
}

exports.resetPassword = async (req, res, next) => {
    const { password } = req.body;
    const { token } = req.params;

    const data = await authMidleware.decodeToken(token);

    const email = data.email;
    const tooken = data.token;

    try {

        const user = await userService.resetPassword({ email });
        if (!user)
            return res.status(400).send({ error: 'Usuário nao encontrado' });

        if (tooken !== user.passwordResetToken)
            return res.status(400).send({ error: 'Informações inválidas' })

        const now = new Date();
        if (now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Validação expirada' })

        user.password = password;

        await userService.updatePassword(user);

        res.status(200).send({ date: now, message: ' Senha alterada com sucesso ' });

    } catch (error) {
        res.status(404).send({ error: 'Erro ao trocar a senha tente novamente' })
    }
}