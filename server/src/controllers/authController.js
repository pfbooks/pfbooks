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
      return { error: 'Email no coincide' };
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return { error: 'Contraseña incorrecta' };
    }

    return user;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = authController;
