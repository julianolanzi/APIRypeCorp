const teamService = require('../services/teams/teams.service');
const imgService = require('../services/imgs/img.service');
const userService = require('../services/users/users.service');

exports.get = async (req, res, next) => {
    try {
        const data = await teamService.get();
        if (data.length == 0) {
            return res.status(400).send({ error: 'Nenhum time encontrado' });
        }
        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send({ error: 'Erro na chamada' });
    }
}

exports.getById = async (req, res, next) => {

    try {
        const data = await teamService.getById(req.params.id);

        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send({ error: 'Time não encontrado' });
    }

}

exports.getTeamsKey = async (req, res, next) => {
    try {
        let key = req.params.key;
        const data = await teamService.getSearchkey(key);
        if (data.length == 0) {
            return res.status(400).send({ error: 'nenhum time encontrado 🥺' });
        }

        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send({ error: 'Erro na chamada' });
    }
}

exports.getUserTeam = async (req, res, next) => {
    try {

        const id = req.params.id

        const user = await teamService.findUserTeam(id);

        if (!user) {
            return res.status(404).send({ error: 'Usuário não pertence a nenhum time' });
        }
        const team = await teamService.getById(user.id);

        const data = {
            data: user,
            dataTeam: team,
        }

        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(401).send({ error: error });
    }
}

exports.post = async (req, res, next) => {

    try {
        const payload = req.body;
        const userid = req.userId;

        const userteam = await teamService.findUserTeam(userid);

        if (userteam) {
            return res.status(404).send({ error: 'Usuário já participa de outro time' });
        }

        const data = await teamService.create(payload, userid);

        res.status(201).send({ data, message: 'Registro do time concluido com sucesso' });

    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'registro de clan falhou verifique os erros e tente novamente' });
    }

}

exports.joinPublicTeam = async (req, res, next) => {
    try {
        const user = req.userId;
        const team = req.body.team;

        const Userteam = await teamService.findUserTeam(user);

        if (Userteam) {
            return res.status(401).send({ error: 'Usuário já pertence a outro time' });
        }

        if (!Userteam) {
            const data = teamService.joinPublicTeam(user, team);

            return res.status(200).send(data);
        }


    } catch (error) {
        console.log(error);
        return res.status(401).send({ error: error });
    }
}

exports.putInfoTeam = async (req, res, next) => {
    try {
        if (req.params.id.length < 24)
            return res.status(404).send({ error: 'íd incorreto' });

        const id = await teamService.getById(req.params.id);

        if (!id) {
            return res.status(401).send({ error: 'Time Inválido' });
        };

        const data = await teamService.updateInfoTeam(req.params.id, req.body);

        res.status(201).send({
            data, message: 'Atualização realizada com sucesso'
        });

    } catch (error) {
        return res.status(400).send({ error: 'Falha ao Atualizar' });
    }
}

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;

        const team = await teamService.getById(id);

        if (!team) {
            return res.status(400).send({ error: 'Time não encontrado' });
        }
        if (team.profileImage.length > 0) {
            await imgService.deleteImg(team.profileImage);
        }

        const data = await teamService.deleteTeam(id);

        return res.status(200).send({ message: 'Time deletado com sucesso' });
    } catch (error) {
        res.status(404).send({ error: 'Team not deleted' });
    }
}

exports.postTeamImg = async (req, res, next) => {
    try {

        const file = req.file;
        const id = req.params.id;
        const imgName = file.fileRef.name;

        const team = await teamService.getById(id);

        if (!team) {
            await imgService.deleteImg(file.fileRef.name);
            return res.status(401).send({ error: 'Time não encontrado' });
        }

        if (team.profileImage.length > 0) {
            let imgfile = team.profileImage;

            await imgService.deleteImg(imgfile);
        }

        let URL = `https://storage.googleapis.com/rypeapp.appspot.com/${imgName}`

        const data = await teamService.postImg(id, URL, imgName);

        return res.status(200).send(data);
    } catch (error) {
        return res.status(401).send({ error: error });
    }
}

exports.deleteTeamImg = async (req, res, next) => {
    try {
        id = req.params.id;

        const team = await teamService.getById(id);

        if (team.profileImage.length > 0) {
            const img = await imgService.deleteImg(team.profileImage);

            const data = await teamService.deleteImg(id);

            return res.status(200).send({ data: 'Foto apagada com sucesso.' });
        } else {
            return res.status(400).send({ data: 'Usuário não possui foto cadastrada' });
        }

    } catch (error) {
        return res.status(401).send({ error: error });
    }
}

exports.quitTeam = async (req, res, next) => {
    try {
        const idTeam = req.params.id;
        const idUser = req.userId;

        const datauser = await teamService.findUserTeam(idUser);

        if (datauser) {
            if (datauser.role == 'sub-admin') {

                const team = await teamService.quitTeam(idTeam, idUser, datauser);
                return res.status(200).send({ error: 'Membro removido com sucesso.' });
            }
            if (datauser.role == 'member') {
                const team = await teamService.quitTeam(idTeam, idUser, datauser);

                return res.status(200).send({ error: 'Membro removido com sucesso.' });
            }

        } else {
            return res.status(404).send({ error: 'Usuário não pertence a nenhum time' });
        }

    } catch (error) {
        return res.status(401).send({ error: error });
    }
}

exports.updateAdminMember = async (req, res, next) => {
    try {
        const team = req.params.id;
        const userMember = req.body.member;

        const user = await teamService.findUserTeam(userMember);
        // const userID = await userService.getByid(userID);

        if (user) {

            if (user.id == team) {

                if (user.role == 'member') {
                    const data = await teamService.putAdminMember(team, userMember);
                    return data
                }
                if (user.role == 'sub-admin') {
                    return res.status(401).send({ error: 'Usuário já é admin do time' });
                }

            } else {
                return res.status(401).send({ error: 'Usuário pertence a outro time' });
            }
        }

        if (!user) {
            const data = await teamService.putAdminMember(team, userMember);
            return res.status(200).send({ data, message: 'Usuário atribuido como adm, com sucesso.' });
        }


    } catch (error) {
        return res.status(401).send({ error: error });
    }
}

exports.deleteMember = async (req, res, next) => {
    try {
        const idTeam = req.params.id;
        const user = req.body.member;
        const datauser = await teamService.findUserTeam(user);

        if (datauser) {
            if (datauser.role == 'sub-admin') {

                const team = await teamService.quitTeam(idTeam, user, datauser);
                return res.status(200).send({ data: 'Membro removido com sucesso.' });
            }
            if (datauser.role == 'member') {
                const team = await teamService.quitTeam(idTeam, user, datauser);

                return res.status(200).send({ data: 'Membro removido com sucesso.' });
            }

        } else {
            return res.status(404).send({ error: 'Usuário não pertence a nenhum time' });
        }


    } catch (error) {
        return res.status(401).send({ error: error });
    }
}

exports.updateRoleMember = async (req, res, next) => {
    
    try {

        const idTeam = req.params.id;
        const user = req.body.member;
        const datauser = await teamService.findUserTeam(user);
       if(datauser){
        if (datauser.role == 'sub-admin') {
            const team = await teamService.quitTeam(idTeam, user, datauser);
            const exit = await teamService.putMember(idTeam, user);
            return res.status(200).send({ data: 'Membro promovido a membro com sucesso.' });
        }
        if (datauser.role == 'member') {
            const team = await teamService.putAdminMember(idTeam, user);
            const exit = await teamService.quitTeam(idTeam, user, datauser);
            return res.status(200).send({ data: 'Membro Promovido a adm com sucesso.' });
        }
       }else{
        return res.status(404).send({ error: 'Usuário não pertence a nenhum time' });
       }

    } catch (error) {
        return res.status(401).send({ error: error });
    }
}


exports.updateMemberTeam = async (req, res, next) => {
    try {
        const team = req.params.id;
        const userMember = req.body.member;

        const user = await teamService.findUserTeam(userMember);
        // const userID = await userService.getByid(userID);

        if (user) {
            return res.status(401).send({ error: 'Usuário pertence a outro time' });
        }

        if (!user) {
            const data = await teamService.putMemberTeam(team, userMember);
            return res.status(200).send({ data, message: 'Usuário adicionado com sucesso.' });
        }


    } catch (error) {
        return res.status(401).send({ error: error });
    }
}

