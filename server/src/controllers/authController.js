const { User } = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = process.env;


const authController = async (email, password) => {
  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      return { error: 'Usuario no encontrado', errorCode: 404};
    }
    if(!user.isActive ){
      return { error: 'Usuario bloqueado', errorCode: 401 };
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { error: 'Credenciales incorrectas', errorCode: 401 };
    }
    const cleanUser = user.dataValues
    delete cleanUser.password

    ///implementacion JWT
    cleanUser.token= generateJWT(cleanUser)

    return cleanUser;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

function generateJWT(cleanUser) {
 //return jwt.sign(cleanUser, JWT_PRIVATE_KEY,{ expiresIn: 3600, algorithm:'RS256'});
  return jwt.sign(cleanUser, JWT_KEY,{ expiresIn: 3600});
}

module.exports = authController;
