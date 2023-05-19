const {google} = require('googleapis');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GMAIL_API_REFRESH_TOKEN} = process.env


const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
);
oauth2Client.setCredentials({
    refresh_token : GMAIL_API_REFRESH_TOKEN
})

const  sendEmail = (destinationEmail, emailSubject, emailBody) => {

    const gmail = google.gmail({version: 'v1', auth: oauth2Client});

    const message = [
        `To: ${destinationEmail}`,
        "From: pfbooks25@gmail.com",
        `Subject: ${emailSubject}`,
        "",
        emailBody].join('\n');

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
            console.log('There was an error sending email notification : ' + err );
            return;
        }
        console.log('Email notification was successfully sent : ', res.data);

    })

};

module.exports = sendEmail;

