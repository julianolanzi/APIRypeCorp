const Users = require('../../models/users/users');
const bcrypt = require('bcryptjs');

exports.create = async (data) => {

    data = {
        ...data,
        url: '',
        profileImage: '',
    }
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
 
    const user = await Users.findById(id).populate(['team']);

    
    return user;
};

exports.updateUser = async (id, data) => {
    const user = await Users.findByIdAndUpdate(id, {
        '$set': {
            nickname: data.nickname,
            name: data.name,
            lastname: data.lastname,
            cpf: data.cpf,
            phone: data.phone,
            email: data.email,
            birthday: data.birthday,
            roles: data.roles,
            verify: data.verify,
        },
    }, { new: true });
    return user;
}

exports.deleteUser = async (id) => {
    const user = await Users.findByIdAndDelete(id);

    return user;
}

exports.updatePass = async (id, data) => {
    const password = await bcrypt.hash(data.newpassword, 15);
    const user = await Users.findByIdAndUpdate(id, {
        '$set': {
            password: password,
        },
    }, { new: true });
    return user;
}

exports.checkUpdatePass = async (email) => {
    const user = await Users.findOne({ email }).select('+password');
    return user;
};

exports.postImg = async (id, URL, imgName) => {

    const user = await Users.findByIdAndUpdate(id, {
        '$set': {
            profileImage: imgName,
            url: URL,
        },
    }, { new: true });

    return user;
}

exports.deleteImg = async (id) => {
    profileImage = '';
    url= '';
    const user = await Users.findOneAndUpdate(id, {
        $set: {
            profileImage,
            url,
        },
    }, { new: true });

    return user;
}