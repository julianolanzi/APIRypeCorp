const Teams = require('../../models/teams/teams');
const Users = require('../../models/users/users');


exports.get = async () => {
    const data = await Teams.find().populate(['admin', 'members']);
    return data;
};
exports.getById = async (id) => {

    const team = await Teams.findById(id).populate(['admin', 'members', 'adminMembers', 'lines']);
    return team;
}
exports.getByUserId = async (id) => {

    const adminUser = await Teams.find({
        admin: id
    });

    if (adminUser.length > 0) {
        let data = {
            id: adminUser[0].id,
            role: 'admin'
        }

        return data;
    }

    const member = await Teams.find({
        members: id
    })

    if (member.length > 0) {
        let data = {
            id: member[0].id,
            role: 'member'
        }

        return data;
    }


    const memberAdmin = await Teams.find({
        adminMembers: id
    })

    if (memberAdmin.length > 0) {
        let data = {
            id: memberAdmin[0].id,
            role: 'sub-admin'
        }
        return data;
    }

}
exports.getByAdminTeam = async (user) => {

    var user = await Teams.find({
        admin: user
    });
    if (user.length != 0) {
        return true;
    }
    return false;
}
exports.getByGroupAdminTeam = async (user) => {
    var user = await Teams.find({
        adminMembers: user
    });
    if (user.length != 0) {
        return true;
    }
    return false;
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
exports.getSearchkey = async (key) => {

    let data = await Teams.find({
        $or: [
            { tagName: { $regex: key } },
            { name: { $regex: key } }
        ]
    }).populate(['admin']);
    if (data.length < 0) {
        let message = 'nenhum time encontrado'
        return message;
    }
    return data;
}
exports.create = async (data) => {
    data = {
        ...data,
        url: data.url,
        profileImage: '',
    }
    var team = new Teams(data);
    await team.save();

    var user = await Users.findOneAndUpdate(data.admin, {
        $push: {
            team: team._id
        }
    }, { new: true });

    return team;
};
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
exports.deleteTeam = async (id) => {
    const data = await Teams.findByIdAndDelete(id);
    return data;
}
exports.updateTeamMember = async (idTeam, UserID) => {
    const team = await Teams.findOneAndUpdate(idTeam, {
        $push: {
            members: [UserID]
        }
    }, { new: true });
    return team;
}
exports.updateAdminMember = async (idTeam, UserID) => {
    const team = await Teams.findOneAndUpdate(idTeam, {
        $push: {
            adminMembers: [UserID]
        }
    }, { new: true });
    return team;
}
exports.deleteTeamMember = async (idTeam, UserID) => {
    const team = await Teams.findOneAndUpdate(idTeam, {
        $pull: {
            members: { $in: [UserID] }
        }
    }, { new: true });
    return team;
}
exports.deleteTeamAdmin = async (idTeam, UserID) => {
    const team = await Teams.findOneAndUpdate(idTeam, {
        $pull: {
            adminMembers: { $in: [UserID] }
        }
    }, { new: true });
    return team;
}
exports.postImg = async (id, URL, imgName) => {

    const team = await Teams.findByIdAndUpdate(id, {
        '$set': {
            profileImage: imgName,
            url: URL,
        },
    }, { new: true });

    return team;
}
exports.deleteImg = async (id) => {
    profileImage = '';
    url = '';
    const team = await Teams.findOneAndUpdate(id, {
        $set: {
            profileImage,
            url,
        },
    }, { new: true });

    return team;
}
exports.updateTeamUser = async (id, team) => {

    const user = await Users.findById(id);

    if (user.team.length == 0) {
        const data = await Users.findByIdAndUpdate(id, {
            $push: {
                team: [team]
            }
        }, { new: true });

        return data;
    } else {
        return { error: 'Usuário já possui um time' }
    }

}
exports.quitTeamMember = async (id, team) => {
    console.log(id, team);
    const data = await Users.findByIdAndUpdate(id, {
        $pull: {
            team: { $in: [team] }
        }
    }, { new: true });

    return data;
}

