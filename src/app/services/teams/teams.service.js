const Teams = require('../../models/teams/teams');

exports.get = async () => {
    const data = await Teams.find().populate(['admin', 'members']);
    return data;
};
exports.create = async (data) => {
    var team = new Teams(data);
    await team.save();
    return team;
};
exports.getByUserAdminTeam = async (user) => {
    console.log(user);
    var user = await Teams.find({
        admin: user
    });
    if (user.length != 0) {
        return false;
    }
    return true;
}
exports.getByUserTeam = async (user) => {

    var user = await Teams.find({
        members: user
    });
    if (user.length != 0) {
        return false;
    }
    return true;
}
exports.getByAdminTeam = async (user) => {

    var user = await Teams.find({
        adminMembers: user
    });
    if (user.length != 0) {
        return false;
    }
    return true;
}
exports.updateInfoTeam = async (id, data) => {
    const InfoTeam = await Teams.findByIdAndUpdate(id, {
        '$set': {
            teamName: data.teamName,
            tagName: data.tagName,
            ranking: data.ranking,
            description: data.description,
        },
    }, { new: true });
    return InfoTeam;
}
exports.getById = async (id) => {
    const team = await Teams.findById(id);
    return team;
}
exports.deleteTeam = async (id) => {
    const data = await Teams.findByIdAndDelete(id);
    return data;
}
exports.updateTeamMember = async (idTeam, UserID) => {
    console.log(idTeam , UserID);
    const team = await Teams.findOneAndUpdate(idTeam, {
        $push: {
            members: [UserID]
        }
    },{ new: true });
    return team;
}
exports.updateAdminMember = async (idTeam, UserID) => {
    console.log(idTeam , UserID);
    const team = await Teams.findOneAndUpdate(idTeam, {
        $push: {
            adminMembers: [UserID]
        }
    },{ new: true });
    return team;
}
exports.deleteTeamMember = async (idTeam, UserID) => {
    console.log(idTeam , UserID);
    const team = await Teams.findOneAndUpdate(idTeam, {
        $pull: {
            members: {$in: [UserID]}
        }
    }, { new: true });
    return team;
}
exports.deleteTeamAdmin = async (idTeam, UserID) => {
    console.log(idTeam , UserID);
    const team = await Teams.findOneAndUpdate(idTeam, {
        $pull: {
            adminMembers: {$in: [UserID]}
        }
    }, { new: true });
    return team;
}

