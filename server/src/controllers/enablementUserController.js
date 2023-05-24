const { User } = require("../db");

const enablementUserController = async ( id, isActive) => {
    try {
        await User.update(
            {
                isActive: isActive
            },
            {
                where:
                    { id: id }
            }
        );

        const updatedUser = await User.findByPk(id);
        const cleanUser = updatedUser.dataValues
        delete cleanUser.password
        return cleanUser

    } catch (error) {
        console.error("update failed !");
        throw error;
    }
};

module.exports = enablementUserController;