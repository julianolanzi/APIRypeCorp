const Users = require('../../models/users/users');
const bcrypt = require('bcryptjs');

exports.login = async (email) => {
    const user = await Users.findOne({ email }).select('+password');
    const lastLogin = await Users.findByIdAndUpdate(user.id, {
        '$set': {
            lastLogin: Date.now(),
        }
       
    });
    return user;
};

exports.forgotPass = async (email) => {
    const user = await Users.findOne(email);
    return user;
};

exports.forgotPassword = async (id, token, now) => {
    const user = await Users.findByIdAndUpdate(id, {
        '$set': {
            passwordResetToken: token,
            passwordResetExpires: now,
        }
    });
    return user;
};

exports.resetPassword = async (email) => {
    const user = await Users.findOne(email).select('+passwordResetToken passwordResetExpires');

    return user;
};

exports.updatePassword = async (user) => {

    const password = await bcrypt.hash(user.password, 15);

    const data = Users.findByIdAndUpdate(user._id, {
        '$set': {
            password: password,
        },
    }, { new: true });
    return data;
};