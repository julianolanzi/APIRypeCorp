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
    lastname: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    cpf: {
        type: Number,
        required: false,
    },
    phone: {
        type: Number,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    verify: {
        type: Boolean,
        required: false,
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
    profileImage: {
        type: String,
        require: false,
    },
    url: {
        type: String,
        required: false
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams',
    }],
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