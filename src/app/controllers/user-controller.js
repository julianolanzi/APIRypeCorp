
const userService = require('../services/users/users.service');
const ValidationContract = require('../validators/fluent-validador');
const emailService = require('../services/emails/email-service');
const bcrypt = require('bcryptjs');

const imgService = require('../services/imgs/img.service');

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
        var user = await userService.getByid(req.params.id);

        res.status(200).send(user);

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

exports.updatePassword = async (req, res, next) => {

    try {
        const data = req.body;

        const user = await userService.checkUpdatePass(data.email);
        var errors2 = 'Senha inválida';

        if (!await bcrypt.compare(data.password, user.password))
            return res.status(400).send({ error: errors2 });

        if (req.params.id.length < 24)
            return res.status(404).send({ error: 'Id incorreto' });

        const id = await userService.getByid(req.params.id);

        if (!id) {
            return res.status(401).send({ error: 'Usuário inválido' });
        };

        if (data.newpassword != data.confirmpassword) {
            return res.status(400).send({ error: 'As senhas são diferentes' });
        }

        const test = await userService.updatePass(req.params.id, data);

        res.status(201).send({
            message: { message: 'Atualização realizada com sucesso' }
        });
    } catch (error) {
        console.log(error);
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
        if(user.profileImage.length > 0){
            const img = await imgService.deleteImg(user.profileImage);
        }

        const data = await userService.deleteUser(id);

        return res.status(200).send({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(404).send({ error: 'Falha ao deleter usuário' });
    }
}

exports.postImg = async (req, res, next) => {
    try {


        const file = req.file;
        const id = req.params.id;
        const imgName = file.fileRef.name;

        const user = await userService.getByid(id);

        if(!user){
            await imgService.deleteImg(file.fileRef.name);
            return res.status(401).send({error: 'Usuário não encontrado'});
        }

        if (user.profileImage.length > 0) {
            
            let imgfile = user.profileImage;

            await imgService.deleteImg(imgfile);
        }
        

        let URL = `https://storage.googleapis.com/rypeapp.appspot.com/${imgName}`

        const data = await userService.postImg(id, URL, imgName);

        return res.status(200).send(data);

    } catch (error) {
        console.log(error);
        return res.status(401).send(error);
    }
}

exports.deleteImg = async (req, res, next) => {
    try {
        id = req.params.id;

        const user = await userService.getByid(id);

        if(!user){
            return res.status(401).send({error: 'Usuário não encontrado'});
        }

        if(user.profileImage.length > 0){
            const img = await imgService.deleteImg(user.profileImage);

            const data = await userService.deleteImg(id);

          return res.status(200).send({data: 'Foto apagada com sucesso.'});
        }else{
            return res.status(400).send({data: 'Usuário não possui foto cadastrada'});
        }
      
        
    } catch (error) {
        return res.status(401).send({error: error});
    }
}