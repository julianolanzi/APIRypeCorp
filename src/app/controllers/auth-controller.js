
const userService = require('../services/auth/auth.service');
const authMidleware = require('../middlewares/auth');
const bcrypt = require('bcryptjs/dist/bcrypt');
const crypto = require('crypto');
const config = require('../config/configs');



exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {

        const user = await userService.login(email);

        var errors1 = ['user not found'];
        var errors2 = ['invalid password'];

        if (!user)
            return res.status(400).send({ errors: errors1 });

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ errors: errors2 });

        user.password = undefined;

        res.status(200).send({
            user: {
                id: user.id,
                email: user.email,
            },
            token: authMidleware.generateToken({ user, id: user.id })
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: 'authentication failed' })
    }
}

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {

        const user = await userService.forgotPass({ email });

        if (!user)
            return res.status(400).send({ error: 'user not found' });

        const token = crypto.randomBytes(40).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        const data = await userService.forgotPassword(user.id, token, now);

        const url = `${config.application}/reset_password/${token}`;

        // const message = emailService.forgotPassword(user, url);
        // console.log(message);
        // emailService.sendEmail(message);

        return res.status(200).send({ url, token, email, message: 'Password change email sent successfully' });

    } catch (error) {
        res.status(400).send({ error: 'Erro on forgot password, try again' })
    }
}

exports.resetPassword = async (req, res, next) => {
    const { email, password } = req.body;
    const { token } = req.params;

    try {

        const user = await userService.resetPassword({ email });
        if (!user)
            return res.status(400).send({ error: 'User not found' });

        if (token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Token invalid' })

        const now = new Date();
        if (now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired generet a new one' })

        user.password = password;
        
        await userService.updatePassword(user);

        res.status(200).send({ date: now, message: ' Password update sucess ' });

    } catch (error) {
        console.log(error);
        res.status(404).send({ error: 'Erro on forgot password, try again' })
    }


}