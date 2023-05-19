const { OAuth2Client } = require("google-auth-library");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const sendEmail = require("../emailNotifications/emailNotification");
const { GOOGLE_CLIENT_ID, JWT_KEY } = process.env;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
const USERNAME_PLACEHOLDER = "${userName}"
const REGISTRATION_MESSAGE = "Hola " + USERNAME_PLACEHOLDER + ".\n\n" +
    "Te informamos que tu registro en nuestro sitio web fue exitoso.\n" +
    "A partir de ahora, podrás acceder a nuestros servicios y funcionalidades.\n" +
    "Gracias por unirte a SERENDIPIA, esperamos disfrutes de la experiencia.\n\n" +
    "Saludos cordiales.\n" +
    "SERENDIPIA"


const authGoogleController = async (credential) =>  {
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: GOOGLE_CLIENT_ID,
        });

        const user = await User.findOne({
            where: {
                email:ticket.getPayload().email
            }
        })

        if (user) {
            return generateUserResponse(user)
        } else {
            const createdUser = await User.create({
                name:  ticket.getPayload().given_name,
                lastName: ticket.getPayload().family_name,
                email:ticket.getPayload().email,
                password:getRandomPassword(),
            })
            sendEmail(
                createdUser.email,
                `Registro exitoso del usuario : ${createdUser.email}`,
                REGISTRATION_MESSAGE.replace(USERNAME_PLACEHOLDER, createdUser.name + " " + createdUser.lastName));
            return generateUserResponse(createdUser)
        }

    } catch (error) {
        return { error: "Invalid user detected. Please try again", errorCode : 401 };
    }
};

function generateUserResponse(user) {
    const cleanUser = user.dataValues
    delete cleanUser.password
    cleanUser.token = jwt.sign(cleanUser, JWT_KEY,{ expiresIn: 3600});
    return {user : cleanUser}
}

function getRandomPassword() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 14) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

module.exports = authGoogleController;