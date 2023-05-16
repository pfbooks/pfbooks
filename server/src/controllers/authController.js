const { User } = require("../db");
const bcrypt = require('bcrypt');

const authController = async (email, password) => {
  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      return { error: 'Email no coincide', errorCode: 404};
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { error: 'Contraseña incorrecta', errorCode: 401 };
    }
    const cleanUser = user.dataValues
    delete cleanUser.password
    return cleanUser;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = authController;
