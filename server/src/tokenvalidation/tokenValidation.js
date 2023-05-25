const { JWT_KEY } = process.env;
const jwt = require('jsonwebtoken');


const validateJWT = (request, requiresAdmin) =>  {
    let jwtObject;
    try{
        const authorization = request.header('authorization').replace('Bearer ', '')
        jwtObject = jwt.verify(authorization, JWT_KEY);
    } catch (error) {
        throw new Error("invalid JWT credentials")
    }
        if(requiresAdmin) {
            if(!jwtObject.adminRole) {
                throw new Error("invalid JWT credentials")
            }
        }
        return jwtObject

}

module.exports = {validateJWT}