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
exports.findUserTeam = async (id) => {
    const admin = await Teams.find({
        admin: id
    });

    if (admin.length > 0) {
        const data = {
            id: admin[0].id,
            role: 'admin'
        }
        return data;
    }


    const member = await Teams.find(
        { members: id }
    );
    if (member.length > 0) {
        const data = {
            id: member[0].id,
            role: 'member'
        }
        return data;
    }

    const adminMember = await Teams.find(
        { adminMembers: id }
    );

    if (adminMember.length > 0) {
        const data = {
            id: adminMember[0].id,
            role: 'sub-admin'
        }
        return data;
    }
}
exports.joinPublicTeam = async (user, team) => {

    const data = await Teams.findByIdAndUpdate(team, {
        $push: {
            members: user
        }
    });

    const datauser = await Users.findByIdAndUpdate(user, {
        $set: {
            team: team
        }
    });

}
exports.create = async (data, userid) => {
    data = {
        ...data,
        url: data.url,
        profileImage: '',
        admin: userid,
    }
    var team = new Teams(data);
    await team.save();

    var user = await Users.findByIdAndUpdate(userid, {
        $push: {
            team: team._id,
        }
    }, { new: true });

    return team;
};
exports.updateInfoTeam = async (id, data) => {

    const InfoTeam = await Teams.findByIdAndUpdate(id, {
        '$set': {
            name: data.name,
            tagName: data.tagName,
            ranking: data.ranking,
            instagramTeam: data.instagramTeam,
            emailTeam: data.emailTeam,
            private: data.private,
            youtubeTeam: data.youtubeTeam,
        },
    }, { new: true });
    return InfoTeam;
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
exports.quitTeam = async (time, user, datauser) => {
    if (datauser.role == 'member') {
        await Teams.findByIdAndUpdate(time, {
            $pull: {
                members: { $in: [user] }
            }
        }, { new: true });
    } else {
        await Teams.findByIdAndUpdate(time, {
            $pull: {
                adminMembers: { $in: [user] }
            }
        }, { new: true });
    }

    await Users.findByIdAndUpdate(user, {
        $pull: {
            team: { $in: [time] }
        }
    }, { new: true });

    return;

}
exports.putAdminMember = async (team, user) => {

    const data = await Teams.findByIdAndUpdate(team, {
        $push: {
            adminMembers: user,
        }
    });

    const datauser = await Users.findByIdAndUpdate(user, {
        $set: {
            team: team
        }
    });

    return data;
}
exports.putMember = async (team, user) => {

    const data = await Teams.findByIdAndUpdate(team, {
        $push: {
            members: user,
        }
    });

    const datauser = await Users.findByIdAndUpdate(user, {
        $set: {
            team: team
        }
    });

    return data;
}


exports.putMemberTeam = async (team, user) => {

    const data = await Teams.findByIdAndUpdate(team, {
        $push: {
            members: user,
        }
    });

    const datauser = await Users.findByIdAndUpdate(user, {
        $set: {
            team: team
        }
    });

    return data;
}

