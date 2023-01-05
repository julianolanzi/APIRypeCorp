const teamService = require('../services/teams/teams.service');
const imgService = require('../services/imgs/img.service');

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

exports.getByIdUser = async (req, res, next) => {

    try {
        const data = await teamService.getByUserId(req.params.id);

        if (!data) {
            return res.status(404).send({ error: 'Usuário não pertence a nenhum time' });
        }

        const dataTeam = await teamService.getById(data.id);


        return res.status(200).send({ data, dataTeam });
    } catch (error) {
        console.log(error);
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

exports.joinTeamPublic = async (req, res, next) => {
    try {
        const data = req.body;
        let id = data.user;
        let team = data.team;


        const user = await teamService.updateTeamUser(id, team);

        const datateam = await teamService.updateTeamMember(team, id);

        return res.status(200).send({ message: 'Entrou no time com sucesso' });
    } catch (error) {
        return res.status(400).send({ error: 'Erro na chamada' });
    }
}

exports.post = async (req, res, next) => {

    try {
        const payload = req.body;
        const user = await teamService.getByAdminTeam(payload.admin);

        if (user == true) {
            return res.status(400).send({ error: 'Usuário já é admin de outro clan' });
        }
        const members = await teamService.getByUserTeam(payload.admin);
        if (members == false) {
            return res.status(400).send({ error: 'Usuário já possui time' });
        }
        const data = await teamService.create(payload);

        res.status(201).send({ data, message: 'Registro do time concluido com sucesso' });

    } catch (error) {
        return res.status(400).send({ error: 'registro de clan falhou verifique os erros e tente novamente' });
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

exports.updateMemberTeam = async (req, res, next) => {

    try {
        const idTeam = req.params.idTaem;
        const UserID = req.params.idMember;

        const user = await teamService.getByAdminTeam(UserID);
        if (user == true) {
            return res.status(400).send({ error: 'úsuario já é admin de um time' });
        }

        const member = await teamService.getByUserTeam(UserID);

        if (member == false) {
            return res.status(400).send({ error: 'úsuario já é membro de outro time' });
        }

        const data = await teamService.updateTeamMember(idTeam, UserID);



        return res.status(200).send({ data, message: 'Membro atualizado com sucesso' });
    } catch (error) {
        res.status(404).send({ error: 'Atualização falhou' });
    }
}

exports.updateAdminTeam = async (req, res, next) => {

    try {
        const idTeam = req.params.idTaem;
        const UserID = req.params.idMember;

        const user = await teamService.getByAdminTeam(UserID);

        if (user == true) {
            return res.status(400).send({ error: 'úsuario já é admin de outro time' });
        }

        const member = await teamService.getByGroupAdminTeam(UserID);

        if (member == true) {
            return res.status(400).send({ error: 'úsuario já pertence a administração de outro time' });
        }

        const data = await teamService.updateAdminMember(idTeam, UserID);



        return res.status(200).send({ data, message: 'admin atualizado com sucesso' });
    } catch (error) {
        res.status(404).send({ error: 'Falha na atualização de time' });
    }
}

exports.deleteMemberTeam = async (req, res, next) => {

    try {
        const idTeam = req.params.idTaem;
        const UserID = req.params.idMember;

        const member = await teamService.getByUserTeam(UserID);

        if (member == true) {
            return res.status(400).send({ error: 'Usuário nao encontrado' });
        }

        const data = await teamService.deleteTeamMember(idTeam, UserID);



        return res.status(200).send({ data, message: 'Membro removido com sucesso' });
    } catch (error) {
        res.status(404).send({ error: 'atualização do time falhou' });
    }
}

exports.deleteAdminTeam = async (req, res, next) => {

    try {
        const idTeam = req.params.idTaem;
        const UserID = req.params.idMember;

        const member = await teamService.getByAdminTeam(UserID);

        if (member == true) {
            return res.status(400).send({ error: 'úsuario não encontrado' });
        }

        const data = await teamService.deleteTeamAdmin(idTeam, UserID);



        return res.status(200).send({ data, message: 'Atualização realizada com sucesso' });
    } catch (error) {
        res.status(404).send({ error: 'falha na atualização' });
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

        const typeuser = await teamService.getByUserId(idUser);

        if (!typeuser) {
            return res.status(404).send({ data: 'Usuário não pertence a nenhum time' });
        }

        if (typeuser.role == 'member') {
            const member = await teamService.deleteTeamMember(idTeam, idUser);
        }

        if (typeuser.role == 'sub-admin') {
            const subAdmin = await teamService.deleteTeamAdmin(idTeam, idUser);
        }

        const user = await teamService.quitTeamMember(idUser, idTeam);

        return res.status(200).send({ data: 'Time removido com sucesso.' });
    } catch (error) {
        return res.status(401).send({ error: error });
    }
}