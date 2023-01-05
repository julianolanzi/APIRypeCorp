const mongoose = require('../../database/DataBaseConnection');

const LineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }],
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },

})



const Line = mongoose.model('Line', LineSchema);
module.exports = Line;