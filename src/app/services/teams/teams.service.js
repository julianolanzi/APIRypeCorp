const Teams = require('../../models/teams/teams');
const Users = require('../../models/users/users');


exports.get = async () => {
    const data = await Teams.find().populate(['admin', 'members']);
    return data;
};
exports.getById = async (id) => {
    const team = await Teams.findById(id);
    return team;
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
    console.log(user);
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


exports.create = async (data) => {
    data = {
        ...data,
        url: '',
        profileImage: '',
    }
    var team = new Teams(data);
    await team.save();

    var user = await Users.findOneAndUpdate(data.admin, {
        $push: {
            team: team._id
        }
    },{ new: true });
    
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
    },{ new: true });
    return team;
}
exports.updateAdminMember = async (idTeam, UserID) => {
    const team = await Teams.findOneAndUpdate(idTeam, {
        $push: {
            adminMembers: [UserID]
        }
    },{ new: true });
    return team;
}
exports.deleteTeamMember = async (idTeam, UserID) => {
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
    url= '';
    const team = await Teams.findOneAndUpdate(id, {
        $set: {
            profileImage,
            url,
        },
    }, { new: true });

    return team;
}

