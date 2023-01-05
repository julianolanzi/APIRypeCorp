const Teams = require('../../models/teams/teams');
const Line = require('../../models/teams/line');


exports.get = async () => {
    const data = await Line.find().populate(['members']);
    return data;
};

exports.create = async (data) => {
   
    var linee = new Line(data);
    await linee.save();

    var team = await Teams.findOneAndUpdate(data.id, {
        $push: {
            lines: linee._id,
        }
    },{ new: true });
    
    return team;
};
