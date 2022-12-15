const teamService = require('../services/teams/teams.service');

exports.get = async (req, res, next) => {
    try {
        const data = await teamService.get();
        if(data.length == 0){
            return res.status(400).send({ error: 'Nenhum time encontrado' });
        }
        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send({ error: 'Erro na chamada' });
    }
}

exports.post = async (req, res, next) => {

    try {
        const payload = req.body;
        const user = await teamService.getByUserAdminTeam(payload.admin);

        if (user == false) {
            return res.status(400).send({ error: 'usúario já é admin de outro clan' });
        }
        const members = await teamService.getByUserTeam(payload.admin);
        if (members == false) {
            return res.status(400).send({ error: 'usúario já possui time' });
        }
        const data = await teamService.create(payload);

        res.status(201).send({ data, message: 'Registro do time concluido com sucesso' });

    } catch (error) {
        console.log(error);
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
            return res.status(400).send({ error: 'Team not found' });
        }

        const data = await teamService.deleteTeam(id);

        return res.status(200).send({ message: 'Team deleted sucess' });
    } catch (error) {
        res.status(404).send({ error: 'Team not deleted' });
    }
}

exports.updateMemberTeam = async (req, res, next) => {

    try {
        const idTeam = req.params.idTaem;
        const UserID = req.params.idMember;

        const user = await teamService.getByAdminTeam(UserID);
        console.log(user);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
        res.status(404).send({ error: 'falha na atualização' });
    }
}