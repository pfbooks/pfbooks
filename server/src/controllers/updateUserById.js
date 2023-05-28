const { User } = require("../db");


const updateUserById = async ( id, name, lastName, email, password, adminRole, image, isActive) => {
    try {
        await User.update(
            {
                name: name,
                lastName:lastName,
                email: email,
                password: password,
                adminRole: adminRole,
                image: image,
                isActive: isActive
            },
            {
                where:
                    { id: id }
            }
        );

        const updatedUser= await User.findByPk(id);
        const cleanUser =  updatedUser.dataValues;
        delete cleanUser.password;
        return cleanUser;

    } catch (error) {
        console.error("update failed !");
        throw error;
    }
};

module.exports = updateUserById;