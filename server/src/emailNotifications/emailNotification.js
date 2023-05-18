const {google} = require('googleapis');
const { GOOGLE_CLIENT_ID, CLIENT_SECRET, YOUR_REDIRECT_URL  } = process.env


const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    GOOGLE_CLIENT_ID,
    CLIENT_SECRET,
    YOUR_REDIRECT_URL
);


const  sendEmail = (destinationEmail) => {
    const gmail = google.gmail({version: 'v1', auth: oauth2Client});

    const message = [
        `To: ${destinationEmail}`,
        "From: pfbooks25@gmail.com",
        "Subject: Registro Exitoso",
        "",
        "Hola Usuario,",
        "",
        "te informamos que tu registro en nuestro sitio web fue exitoso.",
        "",
        "A partir de ahora, podrás acceder a nuestros servicios y funcionalidades",
        "",
        " Gracias por unirte a SERENDIPIA, esperamos disfrutes de la experiencia",
        "",
        "Saludos cordiales,",
        "",
        "SERENDIPIA"
    ].join('\n');

    const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '-')
        .replace(/=+$/, '');

    gmail.users.messages.send({
        userId: "me",
        resource: {
            raw:encodedMessage
        }
    },(err,res) => {
        if(err){
            console.log('La Api retorna un error' + err );
            return;
        }
        console.log('Message sent:', res.data);

    })

};

module.exports = sendEmail;

