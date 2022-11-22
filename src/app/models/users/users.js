const mongoose = require('../../database/DataBaseConnection');
const bcrypt = require('bcryptjs');

const UsersSchema = new mongoose.Schema({
    IdPLayer: {
        type: String,
        required: false,
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: false,
    },
    cpf: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    roles: {
        type: String,
        required: true,
        enum: ['user', 'admin', 'producer'],
        default: 'user'
    },
    privacyTerm: {
        type: Boolean,
        required: true,
        default: true,
    },
    profileImage:{
        type: String,
        require: false,
    },
    size: {
        type: Number,
        required: false
    },
    key: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})

UsersSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 15);
    this.password = hash;

    this.roles = ['user'];

    next();
});

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;