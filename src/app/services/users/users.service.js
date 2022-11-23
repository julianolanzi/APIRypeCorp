const Users = require('../../models/users/users');


exports.create = async (data) => {
   
    var user = new Users(data);
    await user.save();
    return user;
};

exports.getRegister = async (email, cpf) => {
    const data = await Users.find({ email, cpf });
    if(data.length != 0 ){
        return true
    }
    return false;
}