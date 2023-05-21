const {User} = require("../db");


const getUserById =  async (id)  => {

    const userById = await User.findOne({
        where: {
            id: id
        }
    });
    const cleanUser = userById.dataValues;
    delete cleanUser.password;
    return cleanUser
};

module.exports= getUserById;