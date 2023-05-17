const { JWT_KEY } = process.env;
const jwt = require('jsonwebtoken');


const validateJWT = (request) =>  {
    try{
        const authorization = request.header('authorization')
        return jwt.verify(authorization, JWT_KEY);
    } catch (error) {
        throw new Error("invalid JWT credentials")
    }
}

module.exports = {validateJWT}