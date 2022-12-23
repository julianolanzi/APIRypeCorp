const mongoose = require('../../database/DataBaseConnection');

const TeamsSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
    },
    tagName: {
        type: String,
        required: true,
    },
    ranking: {
        type: Number,
        required: false,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require: true,
    },
    description: {
        type: String,
        require: false,
    },
    name: {
        type: String,
        require: false,
    },
    url: {
        type: String,
        required: false
    },
    profileImage: {
        type: String,
        require: false,
    },
    showImage: {
        type: Boolean,
        required: false
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }],
    adminMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },

})



const Teams = mongoose.model('Teams', TeamsSchema);
module.exports = Teams;