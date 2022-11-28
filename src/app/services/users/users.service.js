const Users = require('../../models/users/users');


exports.create = async (data) => {
    var user = new Users(data);
    await user.save();
    return user;
};

exports.getRegister = async (email, cpf) => {
    const data = await Users.find({ email, cpf });
    if (data.length != 0) {
        return true
    }
    return false;
}

exports.get = async () => {
    const res = await Users.find();
    return res;
};

exports.getByid = async (id) => {
    const user = await Users.findById(id);
    return user;
};

exports.updateUser = async (id, data) => {
    const user = await Users.findByIdAndUpdate(id, {
        '$set': {
            nickname: data.nickname,
            name: data.name,
            lastname: data.lastname,
            cpf: data.cpf,
            email: data.email,
            roles: data.roles,
        },
    }, { new: true });
    return user;
}

exports.deleteUser = async (id) => {
    const user = await Users.findByIdAndDelete(id);

    return user;
}