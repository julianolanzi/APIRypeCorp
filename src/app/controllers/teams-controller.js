const teamService = require('../services/teams/teams.service');

exports.get = async (req, res, next) => {

    try {
        const data = await teamService.get();
        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send({ error: 'Teams not found' });
    }

}

exports.post = async (req, res, next) => {

    try {

        const payload = req.body;

        const user = await teamService.getByUserAdminTeam(payload.admin);

        if (user == false) {
            return res.status(400).send({ error: 'user already has admin Team' });
        }

        const members = await teamService.getByUserUserTeam(payload.admin);

        if (members == false) {
            return res.status(400).send({ error: 'user already has user Team' });
        }

        const data = await teamService.create(payload);

        // const message = emailService.registerMessage(payload);
        // emailService.sendEmail(message);

        res.status(201).send({ data, message: 'registration Team successful' });

    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'registration failed' });
    }

}

exports.putInfoTeam = async (req, res, next) => {
    try {

        if (req.params.id.length < 24)
            return res.status(404).send({ error: 'íd incorrect' });

        const id = await teamService.getById(req.params.id);

        if (!id) {
            return res.status(401).send({ error: 'Team invalid' });
        };

        const data = await teamService.updateInfoTeam(req.params.id, req.body);

        res.status(201).send({
            data, message: 'Update Team sucess'
        });

    } catch (error) {
        return res.status(400).send({ error: 'Update Fail' });
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

        const user = await teamService.getByUserAdminTeam(UserID);

        if (user == false) {
            return res.status(400).send({ error: 'user already has admin Team' });
        }

        const member = await teamService.getByUserUserTeam(UserID);

        if (member == false) {
            return res.status(400).send({ error: 'user already has user Team' });
        }

        const data = await teamService.updateTeamMember(idTeam, UserID);



        return res.status(200).send({ data, message: 'Team member update sucess' });
    } catch (error) {
        console.log(error);
        res.status(404).send({ error: 'Update team Members fail' });
    }
}

exports.deleteMemberTeam = async (req, res, next) => {

    try {
        const idTeam = req.params.idTaem;
        const UserID = req.params.idMember;

        const member = await teamService.getByUserUserTeam(UserID);

        if (member == true) {
            return res.status(400).send({ error: 'User not found team' });
        }

        const data = await teamService.deleteTeamMember(idTeam, UserID);



        return res.status(200).send({ data, message: 'Team member update sucess' });
    } catch (error) {
        console.log(error);
        res.status(404).send({ error: 'Update team Members fail' });
    }
}